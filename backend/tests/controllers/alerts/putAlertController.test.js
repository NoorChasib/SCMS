import { putAlert } from "../../../src/controllers/alerts/putAlertController";
import { db, jwtConfig } from "../../../dbConnect";
import jwt from "jsonwebtoken";

describe("putAlert function", () => {
  test("should update the alert details and return a success message", () => {
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
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    db.query = jest.fn().mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    putAlert(mockRequest, mockResponse);

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
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Alert updated",
    });
  });

  test("should return a 401 error for unauthorized access if no access token is provided", () => {
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
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    putAlert(mockRequest, mockResponse);

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
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
        end_time: "2023-04-27T12:00:00.000Z",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    putAlert(mockRequest, mockResponse);

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
        alert_id: 1,
        alert_type: "motion",
        start_time: "2023-04-27T10:00:00.000Z",
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

    putAlert(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "An error occurred",
    });
  });
});
