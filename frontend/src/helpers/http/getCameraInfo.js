// Import necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to fetch camera information from the API and update the state with the results
export const getCameraInfo = async (setCameraInfo) => {
  try {
    // Send a GET request to the "/camera-info" endpoint
    const response = await makeRequest.get("/camera-info");

    // Extract the camera information from the response data
    const cameraInfo = response.data.camera_information;

    // Update the state with the fetched camera information
    setCameraInfo(cameraInfo);
  } catch (error) {
    // Throw an error if an error occurs while fetching the camera information
    throw new Error("An error occurred while fetching the camera information.");
  }
};
