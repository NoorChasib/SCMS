// Import necessary modules and packages
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DataContext } from "../contexts/dataContext";

const PrivateRoutes = () => {
  const { userData } = useContext(DataContext);

  // Render the outlet if the user is authenticated, or redirect to the login page if not
  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
