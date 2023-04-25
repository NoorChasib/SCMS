import { getCameras } from "../../../src/controllers/cameras/getCamerasController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

describe("getCameras function", () => {
  test("should return cameras for the user", () => {
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, [
        { id: 1, name: "Camera 1" },
        { id: 2, name: "Camera 2" },
      ]);
    });

    getCameras(mockRequest, mockResponse);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM camera WHERE user_id = ?",
      [1],
      expect.any(Function),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      cameras: [
        { id: 1, name: "Camera 1" },
        { id: 2, name: "Camera 2" },
      ],
    });
  });

  test("should return a 401 error for unauthorized access if no access token is provided", () => {
    const mockRequest = {
      cookies: {},
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getCameras(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access",
    });
  });

  test("should return a 401 error for invalid or expired token", () => {
    const mockToken = jwt.sign({ id: 1 }, "wrongSecret");
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getCameras(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  test("should return a 500 error for any other errors", () => {
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(new Error("Something went wrong"), null);
    });

    getCameras(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
