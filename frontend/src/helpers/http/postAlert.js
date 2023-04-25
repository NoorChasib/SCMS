// Import necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to post an alert to the API and return the response data
export const postAlert = async (camera_id, alertData) => {
  try {
    // Send a POST request to the /alerts/${camera_id} endpoint with the alert data
    const response = await makeRequest.post(`/alerts/${camera_id}`, alertData);

    // Return the response data
    return response.data;
  } catch (error) {
    // Throw an error if an error occurs while posting the alert
    throw new Error("An error occurred while posting the alert.");
  }
};
