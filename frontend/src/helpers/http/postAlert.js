import { makeRequest } from "../../utils/axiosHelper.jsx";

export const postAlert = async (camera_id, alertData) => {
  try {
    const response = await makeRequest.post(`/alerts/${camera_id}`, alertData);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while posting the alert.");
  }
};
