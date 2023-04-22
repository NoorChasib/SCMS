// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../utils/axiosHelper";

// Create a new context object for authentication
export const AuthContext = createContext();

// Create a new component to wrap the application and provide authentication state
export const AuthContextProvider = ({ children }) => {
  // Use local storage to persist user data across sessions
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );

  // Define a function to handle user login
  const login = async (inputs) => {
    // Send a request to the server to login the user
    const res = await makeRequest.post("/login", inputs);
    // Update the user data state with the response data
    setUserData(res.data);
  };

  // Use the useEffect hook to persist user data to local storage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  // Render the children of the component wrapped in the authentication context provider
  return (
    <AuthContext.Provider value={{ userData, login, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
