// Import required modules
import { getCameras } from "../../../src/controllers/cameras/getCamerasController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

// Describe the "getCameras" function tests.
describe("getCameras function", () => {
  // Test that the function returns cameras for the user.
  test("should return cameras for the user", () => {
    // Generate a mock token for user authentication.
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    // Create a mock request with the mock token.
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Create a mock response object.
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the "db.query" function with a callback function that returns an array of camera objects.
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, [
        { id: 1, name: "Camera 1" },
        { id: 2, name: "Camera 2" },
      ]);
    });

    // Call the "getCameras" function with the mock request and response objects.
    getCameras(mockRequest, mockResponse);

    // Assert that the "db.query" function was called with the correct arguments.
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM camera WHERE user_id = ?",
      [1],
      expect.any(Function),
    );

    // Assert that the "status" method of the mock response object was called with status code 200.
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Assert that the "json" method of the mock response object was called with an object that contains an array of camera objects.
    expect(mockResponse.json).toHaveBeenCalledWith({
      cameras: [
        { id: 1, name: "Camera 1" },
        { id: 2, name: "Camera 2" },
      ],
    });
  });

  // Test that the function returns a 401 error for unauthorized access if no access token is provided.
  test("should return a 401 error for unauthorized access if no access token is provided", () => {
    // Create a mock request without an access token.
    const mockRequest = {
      cookies: {},
    };
    // Create a mock response object.
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the "getCameras" function with the mock request and response objects.
    getCameras(mockRequest, mockResponse);

    // Assert that the "status" method of the mock response object was called with status code 401.
    expect(mockResponse.status).toHaveBeenCalledWith(401);

    // Assert that the "json" method of the mock response object was called with an object that contains an error message.
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access",
    });
  });

  // Test that the function returns a 401 error for invalid or expired token.
  test("should return a 401 error for invalid or expired token", () => {
    // Generate a mock token with the wrong secret for user authentication.
    const mockToken = jwt.sign({ id: 1 }, "wrongSecret");
    // Create a mock request with the mock token.
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Create a mock response object.
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the "getCameras" function with the mock request and response objects.
    getCameras(mockRequest, mockResponse);

    // Assert that the "status" method of the mock response object was called with status code 401.
    expect(mockResponse.status).toHaveBeenCalledWith(401);

    // Assert that the "json" method of the mock response object was called with an object that contains an error message.
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  // Test that the function returns a 500 error for any other errors.
  test("should return a 500 error for any other errors", () => {
    // Generate a mock token for user authentication.
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    // Create a mock request with the mock token.
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
    };
    // Create a mock response object.
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the "db.query" function with a callback function that throws an error.
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(new Error("Something went wrong"), null);
    });

    // Call the "getCameras" function with the mock request and response objects.
    getCameras(mockRequest, mockResponse);

    // Assert that the "status" method of the mock response object was called with status code 500.
    expect(mockResponse.status).toHaveBeenCalledWith(500);

    // Assert that the "json" method of the mock response object was called with an object that contains an error message.
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
