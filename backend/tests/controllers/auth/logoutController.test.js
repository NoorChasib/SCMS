// Import required modules
import { Logout } from "../../../src/controllers/auth/logoutController";

// Start a Jest test suite for the Logout function
describe("Logout function", () => {
  // Start a test case for when the user logs out successfully
  test("should clear access token cookie and return success message", () => {
    // Create a mock response object with the clearCookie, status, and JSON functions
    const mockResponse = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Call the Logout function with an empty request object and the mock response object
    Logout({}, mockResponse);
    // Expect that the response clearCookie, status, and JSON functions were called with the correct parameters
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
