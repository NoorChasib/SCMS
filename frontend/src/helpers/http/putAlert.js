import { makeRequest } from "../../utils/axiosHelper.jsx";

export const putAlert = async (camera_id, alertData) => {
  try {
    const response = await makeRequest.put(`/alerts/${camera_id}`, alertData);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while updating the alert.");
  }
};
