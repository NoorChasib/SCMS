import { Logout } from "../../../src/controllers/auth/logoutController";

describe("Logout function", () => {
  test("should clear access token cookie and return success message", () => {
    const mockResponse = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Logout({}, mockResponse);

    expect(mockResponse.clearCookie).toHaveBeenCalledWith("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User has been logged out. Access token cookie cleared.",
    });
  });
});
