// Import the necessary modules and packages
import { makeRequest } from "../../utils/axiosHelper.jsx";

// Define a function to fetch all alerts from the API and update the state with the results
export const getAllAlerts = async (setAllAlerts) => {
  try {
    // Send a GET request to the "/alerts" endpoint
    const response = await makeRequest.get("/alerts");

    // Extract the alerts from the response data
    const alerts = response.data.alerts;

    // Update the state with the fetched alerts
    setAllAlerts(alerts);
  } catch (error) {
    // Throw an error if an error occurs while fetching the alerts
    throw new Error("An error occurred while fetching all alerts.");
  }
};
