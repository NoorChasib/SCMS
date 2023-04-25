import { postAlert } from "../../../src/controllers/alerts/postAlertController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

describe("postAlert function", () => {
  test("should create a new alert for a user and camera and return a success message with the new alert ID", () => {
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

    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    postAlert(mockRequest, mockResponse);

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO alerts (user_id, camera_id, alert_type, end_time) VALUES (?, ?, ?, ?)",
      [1, 1, "motion", "2023-04-27T12:00:00.000Z"],
      expect.any(Function),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Alert created",
      alert_id: 1,
    });
  });

  test("should return a 401 error for unauthorized access if no access token is provided", () => {
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

    postAlert(mockRequest, mockResponse);

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

    postAlert(mockRequest, mockResponse);

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

    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(new Error("Something went wrong"), null);
    });

    postAlert(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
