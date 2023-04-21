import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { makeRequest } from "../../utils/axiosHelper";
import { AuthContext } from "../../contexts/authContext";

const Logout = () => {
  // Retrieve the setCurrentUser function from the AuthContext
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    // Define a function to handle the logout process
    const performLogout = async () => {
      try {
        // Send a POST request to the /logout endpoint to log the user out
        await makeRequest.post("/logout");
      } catch (err) {
        // Log an error if the logout request fails
        console.error("Error during logout:", err);
      }

      // Clear the access token and user data from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear any cookies (if you have any)
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Update the AuthContext to indicate that the user is logged out
      setCurrentUser(null);
    };

    // Call the performLogout function when the component mounts
    performLogout();
  }, [setCurrentUser]);

  // Use the Navigate component from react-router-dom to redirect to the login page
  return <Navigate to="/login" replace />;
};

export default Logout;
