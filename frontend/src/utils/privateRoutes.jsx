// Import necessary modules and packages
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const PrivateRoutes = () => {
  const { userData } = useContext(AuthContext);

  // Render the outlet if the user is authenticated, or redirect to the login page if not
  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
