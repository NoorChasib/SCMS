// Import necessary modules and packages
import axios from "axios";
// Create an instance of axios to make requests to the API
export const makeRequest = axios.create({
  baseURL: "http://localhost:3000/api/", // Set the base URL for API requests
  withCredentials: true, // Enable sending of cookies with requests
});
