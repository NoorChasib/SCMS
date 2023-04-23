import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { makeRequest } from "../../utils/axiosHelper";
import { DataContext } from "../../contexts/dataContext";

const Logout = () => {
  // Retrieve the setUserData function from the DataContext
  const { setUserData } = useContext(DataContext);

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
      localStorage.removeItem("userData");
      localStorage.removeItem("cameras");
      localStorage.removeItem("cameraInfo");
      localStorage.removeItem("timestamp");
      localStorage.removeItem("videoPlaybackTime");

      // Clear any cookies (if you have any)
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Update the DataContext to indicate that the user is logged out
      setUserData(null);
    };

    // Call the performLogout function when the component mounts
    performLogout();
  }, [setUserData]);

  // Use the Navigate component from react-router-dom to redirect to the login page
  return <Navigate to="/login" replace />;
};

export default Logout;
