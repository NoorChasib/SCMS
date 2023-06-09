// Import required modules
import { getCameraInfo } from "../../../src/controllers/cameras/getCameraInfoController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

describe("getCameraInfo function", () => {
  test("should return camera information for the user", () => {
    // Mock a JWT token
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    // Mock the request object
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Mock the response object
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the database query result
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, [{ id: 1, camera_id: 1, location: "Living Room" }]);
    });

    // Call the getCameraInfo function with the mocked request and response objects
    getCameraInfo(mockRequest, mockResponse);

    // Assert that db.query has been called with the expected query and values
    expect(db.query).toHaveBeenCalledWith(
      `
      SELECT ci.* FROM camera_information ci
      JOIN camera c ON ci.camera_id = c.id
      WHERE c.user_id = ?`,
      [1],
      expect.any(Function),
    );

    // Assert that status has been called with 200 and json has been called with the expected response body
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      camera_information: [{ id: 1, camera_id: 1, location: "Living Room" }],
    });
  });

  test("should return a 401 error for unauthorized access if no access token is provided", () => {
    // Mock the request object
    const mockRequest = {
      cookies: {},
    };
    // Mock the response object
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the getCameraInfo function with the mocked request and response objects
    getCameraInfo(mockRequest, mockResponse);

    // Assert that status has been called with 401 and json has been called with the expected error message
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access",
    });
  });

  test("should return a 401 error for invalid or expired token", () => {
    // Mock a JWT token with an incorrect secret
    const mockToken = jwt.sign({ id: 1 }, "wrongSecret");
    // Mock the request object
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Mock the response object
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the getCameraInfo function with the mocked request and response objects
    getCameraInfo(mockRequest, mockResponse);

    // Assert that status has been called with 401 and json has been called with the expected error message
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  test("should return a 500 error for any other errors", () => {
    // Mock a JWT token
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    // Mock the request object
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Mock the response object
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
