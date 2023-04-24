// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { postLogin } from "../helpers/http/postLogin";
import { getCameras } from "../helpers/http/getCameras";
import { getCameraInfo } from "../helpers/http/getCameraInfo";
import { getAllAlerts } from "../helpers/http/getAlerts";
import { postAlert } from "../helpers/http/postAlert";
import { putAlert } from "../helpers/http/putAlert";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
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

  return (
    <DataContext.Provider
      value={{
        userData,
        login,
        setUserData,
        cameras,
        cameraInfo,
        allAlerts,
        postAlert,
        putAlert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
