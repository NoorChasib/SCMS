import { getAllAlerts } from "../../../src/controllers/alerts/getAlertsController.js";
import jwt from "jsonwebtoken";
import { db, jwtConfig } from "../../../dbConnect.js";

describe("getAllAlerts", () => {
  it("should return a list of alerts for a specific user", () => {
    const token = jwt.sign({ id: 1 }, jwtConfig.secret);
    const req = { cookies: { accessToken: token } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockData = [
      { id: 1, user_id: 1, camera_id: 1, message: "Alert 1" },
      { id: 2, user_id: 1, camera_id: 2, message: "Alert 2" },
    ];

    const mockQuery = jest.spyOn(db, "query");
    mockQuery.mockImplementation((q, args, cb) => cb(null, mockData));

    getAllAlerts(req, res);

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM alerts WHERE user_id = ?",
      [1],
      expect.any(Function),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ alerts: mockData });
  });

  it("should return a 401 error for unauthorized access", () => {
    const req = { cookies: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getAllAlerts(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized access" });
  });

  it("should return a 401 error for invalid or expired token", () => {
    const req = { cookies: { accessToken: "invalid token" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getAllAlerts(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });
});
