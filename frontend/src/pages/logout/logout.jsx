import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { makeRequest } from "../../utilities/axiosHelper";
import { AuthContext } from "../../context/authContext";

const Logout = () => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await makeRequest.post("/logout");
      } catch (err) {
        console.error("Error during logout:", err);
      }

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear cookies (if you have any)
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Update the AuthContext
      setCurrentUser(null);
    };

    performLogout();
  }, [setCurrentUser]);

  return <Navigate to="/login" replace />;
};

export default Logout;
