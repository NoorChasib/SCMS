import { makeRequest } from "../../utils/axiosHelper.jsx";

export const getAllAlerts = async (setAllAlerts) => {
  try {
    const response = await makeRequest.get("/alerts");
    const alerts = response.data.alerts;
    setAllAlerts(alerts);
  } catch (error) {
    throw new Error("An error occurred while fetching all alerts.");
  }
};
