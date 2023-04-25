// Import required modules
import { getAllAlerts } from "../../../src/controllers/alerts/getAlertsController.js";
import jwt from "jsonwebtoken";
import { db, jwtConfig } from "../../../dbConnect.js";

// Test suite for getAllAlerts function
describe("getAllAlerts", () => {
  // Test case for successful retrieval of alerts for a specific user
  it("should return a list of alerts for a specific user", () => {
    // Generating a mock JWT token for authorization
    const token = jwt.sign({ id: 1 }, jwtConfig.secret);

    // Creating a mock request object with the generated token
    const req = { cookies: { accessToken: token } };

    // Creating a mock response object with jest functions
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock data to be returned by the database query
    const mockData = [
      { id: 1, user_id: 1, camera_id: 1, message: "Alert 1" },
      { id: 2, user_id: 1, camera_id: 2, message: "Alert 2" },
    ];

    // Creating a spy on the database query function to return mock data
    const mockQuery = jest.spyOn(db, "query");
    mockQuery.mockImplementation((q, args, cb) => cb(null, mockData));

    // Calling the getAllAlerts function with the mock request and response objects
    getAllAlerts(req, res);

    // Asserting that the database query was called with the expected parameters
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM alerts WHERE user_id = ?",
      [1],
      expect.any(Function),
    );

    // Asserting that the response status and json functions were called with the expected parameters
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ alerts: mockData });
  });

  // Test case for unauthorized access
  it("should return a 401 error for unauthorized access", () => {
    // Creating a mock request object without a valid token
    const req = { cookies: {} };

    // Creating a mock response object with jest functions
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Calling the getAllAlerts function with the mock request and response objects
    getAllAlerts(req, res);

    // Asserting that the response status and json functions were called with the expected parameters
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized access" });
  });

  // Test case for invalid or expired token
  it("should return a 401 error for invalid or expired token", () => {
    // Creating a mock request object with an invalid token
    const req = { cookies: { accessToken: "invalid token" } };

    // Creating a mock response object with jest functions
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Calling the getAllAlerts function with the mock request and response objects
    getAllAlerts(req, res);

    // Asserting that the response status and json functions were called with the expected parameters
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });
});
