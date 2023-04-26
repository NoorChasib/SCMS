// Import necessary modules and packages
import axios from "axios";

// Create an instance of axios to make requests to the API
export const makeRequest = axios.create({
  baseURL: `${import.meta.env.VITE_PROTOCAL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`,
  withCredentials: true, // Enable sending of cookies with requests
});
