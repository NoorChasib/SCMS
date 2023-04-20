// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../utilities/axiosHelper";

// Create a new context object for authentication
export const AuthContext = createContext();

// Create a new component to wrap the application and provide authentication state
export const AuthContextProvider = ({ children }) => {
  // Use local storage to persist user data across sessions
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // Define a function to handle user login
  const login = async (inputs) => {
    // Send a request to the server to login the user
    const res = await makeRequest.post("/login", inputs);
    // Update the current user state with the response data
    setCurrentUser(res.data);
  };

  // Use the useEffect hook to persist user data to local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Render the children of the component wrapped in the authentication context provider
  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
