import { getCameraInfo } from "../../../src/controllers/cameras/getCameraInfoController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

describe("getCameraInfo function", () => {
  test("should return camera information for the user", () => {
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
      callback(null, [{ id: 1, camera_id: 1, location: "Living Room" }]);
    });

    getCameraInfo(mockRequest, mockResponse);

    expect(db.query).toHaveBeenCalledWith(
      `
      SELECT ci.* FROM camera_information ci
      JOIN camera c ON ci.camera_id = c.id
      WHERE c.user_id = ?`,
      [1],
      expect.any(Function),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      camera_information: [{ id: 1, camera_id: 1, location: "Living Room" }],
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

    getCameraInfo(mockRequest, mockResponse);

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

    getCameraInfo(mockRequest, mockResponse);

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

    getCameraInfo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
