// Import necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to fetch cameras from the API and update the state with the results
export const getCameras = async (setCameras) => {
  try {
    // Send a GET request to the "/cameras" endpoint
    const response = await makeRequest.get("/cameras");

    // Extract the cameras from the response data
    const cameras = response.data.cameras;

    // Update the state with the fetched cameras
    setCameras(cameras);
  } catch (error) {
    // Throw an error if an error occurs while fetching the cameras
    throw new Error("An error occurred while fetching the cameras.");
  }
};
