// Create a new context object for sharing theme data
import { createContext, useState } from "react";

const ThemeContext = createContext();

// Define the theme context provider component
export const ThemeProvider = ({ children }) => {
  // Set up a state variable to track whether dark mode is enabled
  const [darkMode, setDarkMode] = useState(false);

  // Render the theme context provider component with the appropriate value
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
