// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { postLogin } from "../helpers/http/postLogin";
import { getCameras } from "../helpers/http/getCameras";
import { getCameraInfo } from "../helpers/http/getCameraInfo";
import { getAllAlerts } from "../helpers/http/getAlerts";
import { postAlert } from "../helpers/http/postAlert";
import { putAlert } from "../helpers/http/putAlert";

// Create a new context object for data sharing
export const DataContext = createContext();

// Define the data context provider component
export const DataContextProvider = ({ children }) => {
  // Set up state variables for user data, camera data, camera info, and alerts
  const [userData, setUserData] = useState(
    () => JSON.parse(localStorage.getItem("userData")) || null,
  );
  const [cameras, setCameras] = useState(
    () => JSON.parse(localStorage.getItem("cameras")) || null,
  );
  const [cameraInfo, setCameraInfo] = useState(
    () => JSON.parse(localStorage.getItem("cameraInfo")) || null,
  );
  const [allAlerts, setAllAlerts] = useState(
    () => JSON.parse(localStorage.getItem("allAlerts")) || null,
  );

  // Define functions for user login, camera data fetching, camera info fetching, and alert fetching
  const login = async (inputs) => {
    await postLogin(inputs, setUserData);
  };

  const fetchCameras = async () => {
    await getCameras(setCameras);
  };

  const fetchCameraInfo = async () => {
    await getCameraInfo(setCameraInfo);
  };

  const fetchAllAlerts = async () => {
    await getAllAlerts(setAllAlerts);
  };

  // Define a function for adding a new alert to the list of alerts
  const addAlert = (newAlert) => {
    setAllAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Define a function for adding an input alert to the list of alerts
  const inputAlert = async (camera_id, alertData) => {
    const newAlert = await postAlert(camera_id, alertData);
    addAlert(newAlert);
  };

  // Use effects to fetch data and update local storage when state variables change
  useEffect(() => {
    if (userData) {
      fetchCameras();
      fetchCameraInfo();
      fetchAllAlerts();
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("cameras", JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem("cameraInfo", JSON.stringify(cameraInfo));
  }, [cameraInfo]);

  useEffect(() => {
    localStorage.setItem("allAlerts", JSON.stringify(allAlerts));
  }, [allAlerts]);

  // Render the data context provider component with the appropriate values
  return (
    <DataContext.Provider
      value={{
        userData,
        login,
        setUserData,
        cameras,
        cameraInfo,
        allAlerts,
        putAlert,
        inputAlert,
        fetchAllAlerts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
