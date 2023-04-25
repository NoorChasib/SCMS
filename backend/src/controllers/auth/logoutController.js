// Define the Logout function to handle user logout
export const Logout = (req, res) => {
  // Clear the "accessToken" cookie from the response object
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true, // Set secure to true if using HTTPS
      sameSite: "strict",
    })
    // Send a 200 (OK) response with a success message
    .status(200)
    .json({
      message: "User has been logged out. Access token cookie cleared.",
    });

  return res;
};
