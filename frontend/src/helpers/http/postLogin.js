// Import necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to post login data to the API and set the user data
export const postLogin = async (inputs, setUserData) => {
  // Send a POST request to the /login endpoint of the API with the login inputs
  const response = await makeRequest.post("/login", inputs);

  // Set the user data with the response data
  setUserData(response.data);
};
