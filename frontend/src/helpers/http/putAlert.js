// Import necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to update an alert with the specified ID and data
export const putAlert = async (camera_id, alertData) => {
  try {
    // Send a PUT request to the /alerts/${camera_id} endpoint of the API with the alert data
    const response = await makeRequest.put(`/alerts/${camera_id}`, alertData);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while updating the alert.");
  }
};
