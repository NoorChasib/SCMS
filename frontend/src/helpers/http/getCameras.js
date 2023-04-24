import { makeRequest } from "../../utils/axiosHelper.jsx";

export const getCameras = async (setCameras) => {
  try {
    const response = await makeRequest.get("/cameras");
    const cameras = response.data.cameras;
    setCameras(cameras);
  } catch (error) {
    throw new Error("An error occurred while fetching the cameras.");
  }
};
