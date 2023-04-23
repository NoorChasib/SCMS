// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../utils/axiosHelper.jsx";

// Create a new context object for data
export const DataContext = createContext();

// Create a new component to wrap the application and provide data
export const DataContextProvider = ({ children }) => {
  // Use state to store user data, cameras, and camera information
  const [userData, setUserData] = useState(
    () => JSON.parse(localStorage.getItem("userData")) || null,
  );
  const [cameras, setCameras] = useState(
    () => JSON.parse(localStorage.getItem("cameras")) || null,
  );
  const [cameraInfo, setCameraInfo] = useState(
    () => JSON.parse(localStorage.getItem("cameraInfo")) || null,
  );

  // Define a function to handle user login
  const login = async (inputs) => {
    // Send a request to the server to login the user
    const res = await makeRequest.post("/login", inputs);
    // Update the user data state with the response data
    setUserData(res.data);
  };

  // Define a function to fetch cameras
  const fetchCameras = async () => {
    try {
      // Make a GET request to the API to fetch user's cameras
      const response = await makeRequest.get("/cameras");

      // Get the cameras from the response data
      const cameras = response.data.cameras;
      setCameras(cameras);
    } catch (error) {
      console.error(error);
      // Throw an error if something goes wrong
      throw new Error("An error occurred while fetching the cameras.");
    }
  };

  // Define a function to fetch camera information
  const fetchCameraInfo = async () => {
    try {
      // Make a GET request to the API to fetch camera information
      const response = await makeRequest.get("/camera-info");

      // Get the camera information from the response data
      const cameraInfo = response.data.camera_information;
      setCameraInfo(cameraInfo);
    } catch (error) {
      console.error(error);
      // Throw an error if something goes wrong
      throw new Error(
        "An error occurred while fetching the camera information.",
      );
    }
  };

  // Use the useEffect hook to fetch user data, cameras, and camera information when the component mounts
  useEffect(() => {
    if (userData) {
      fetchCameras();
      fetchCameraInfo();
    }
  }, [userData]);

  // Use the useEffect hook to persist the user data, cameras, and camera information to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("cameras", JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem("cameraInfo", JSON.stringify(cameraInfo));
  }, [cameraInfo]);

  // Render the children of the component wrapped in the data context provider
  return (
    <DataContext.Provider
      value={{ userData, login, setUserData, cameras, cameraInfo }}
    >
      {children}
    </DataContext.Provider>
  );
};
