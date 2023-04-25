// Import required modules
import { postAlert } from "../../../src/controllers/alerts/postAlertController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

// Test suite for postAlert function
describe("postAlert function", () => {
  // Test case for successful creation of a new alert
  test("should create a new alert for a user and camera and return a success message with the new alert ID", () => {
    // Creating mock data for request and response objects
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_type: "motion",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query function to return a new alert ID
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    // Calling the postAlert function with the mock request and response objects
    postAlert(mockRequest, mockResponse);

    // Asserting that the database query was called with the expected parameters
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO alerts (user_id, camera_id, alert_type, end_time) VALUES (?, ?, ?, ?)",
      [1, 1, "motion", "2023-04-27T12:00:00.000Z"],
      expect.any(Function),
    );

    // Asserting that the response status and json functions were called with the expected parameters
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Alert created",
      alert_id: 1,
    });
  });

  // Test case for unauthorized access
  test("should return a 401 error for unauthorized access if no access token is provided", () => {
    // Creating mock data for request and response objects without an access token
    const mockRequest = {
      cookies: {},
      params: {
        camera_id: 1,
      },
      body: {
        alert_type: "motion",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Calling the postAlert function with the mock request and response objects
    postAlert(mockRequest, mockResponse);

    // Asserting that the response status and json functions were called with the expected parameters
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access",
    });
  });

  // Test case for invalid or expired token
  test("should return a 401 error for invalid or expired token", () => {
    // Creating mock data for request and response objects with an invalid token
    const mockToken = jwt.sign({ id: 1 }, "wrongSecret");
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_type: "motion",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Calling the postAlert function with the mock request and response objects
    postAlert(mockRequest, mockResponse);

    // Asserting that the response status and json functions were called with the expected parameters
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  // Test case for any other errors
  test("should return a 500 error for any other errors", () => {
    // Creating mock data for request and response objects
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_type: "motion",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query function to return an error
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(new Error("Something went wrong"), null);
    });

    // Calling the postAlert function with the mock request and response objects
    postAlert(mockRequest, mockResponse);

    // Asserting that the response status and json functions were called with the expected parameters
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
