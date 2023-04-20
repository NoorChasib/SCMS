export const Logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true, // Set secure to true if using HTTPS
      sameSite: "strict",
    })
    .status(200)
    .json({
      message: "User has been logged out. Access token cookie cleared.",
    });
};
