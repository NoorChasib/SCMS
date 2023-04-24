import { makeRequest } from "../../utils/axiosHelper.jsx";

export const getCameraInfo = async (setCameraInfo) => {
  try {
    const response = await makeRequest.get("/camera-info");
    const cameraInfo = response.data.camera_information;
    setCameraInfo(cameraInfo);
  } catch (error) {
    throw new Error("An error occurred while fetching the camera information.");
  }
};
