// Import required modules
import { putAlert } from "../../../src/controllers/alerts/putAlertController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

// Start a Jest test suite for the putAlert function
describe("putAlert function", () => {
  // Start a test case for successful update of alert details
  test("should update the alert details and return a success message", () => {
    // Create mock request data with a valid access token, camera ID, and updated alert details
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    // Create a mock response object with the necessary status and JSON functions
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Mock the db query function to return a success status
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });
    // Call the putAlert function with the mock request and response objects
    putAlert(mockRequest, mockResponse);
    // Expect that the db query function was called with the correct parameters
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE alerts SET camera_id = ?, alert_type = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?",
      [
        1,
        "motion",
        "2023-04-27T10:00:00.000Z",
        "2023-04-27T12:00:00.000Z",
        1,
        1,
      ],
      expect.any(Function),
    );
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Alert updated",
    });
  });

  // Start a test case for unauthorized access due to missing access token
  test("should return a 401 error for unauthorized access if no access token is provided", () => {
    // Create mock request data without an access token, but with a camera ID and updated alert details
    const mockRequest = {
      cookies: {},
      params: {
        camera_id: 1,
      },
      body: {
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    // Create a mock response object with the necessary status and JSON functions
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Call the putAlert function with the mock request and response objects
    putAlert(mockRequest, mockResponse);
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access",
    });
  });

  // Start a test case for unauthorized access due to invalid or expired access token
  test("should return a 401 error for invalid or expired token", () => {
    // Create mock request data with an invalid or expired access token, camera ID, and updated alert details
    const mockToken = jwt.sign({ id: 1 }, "wrongSecret");
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    // Create a mock response object with the necessary status and JSON functions
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Call the putAlert function with the mock request and response objects
    putAlert(mockRequest, mockResponse);
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  // Start a test case for other errors
  test("should return a 500 error for any other errors", () => {
    // Create mock request data with a valid access token, camera ID, and updated alert details
    const mockToken = jwt.sign({ id: 1 }, jwtConfig.secret);
    const mockRequest = {
      cookies: {
        accessToken: mockToken,
      },
      params: {
        camera_id: 1,
      },
      body: {
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    // Create a mock response object with the necessary status and JSON functions
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Mock the db query function to return an error
    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(new Error("Something went wrong"), null);
    });
    // Call the putAlert function with the mock request and response objects
    putAlert(mockRequest, mockResponse);
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
