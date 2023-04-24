// Import necessary modules and packages
import { createContext, useEffect, useState } from "react";
import { postLogin } from "../helpers/http/postLogin";
import { getCameras } from "../helpers/http/getCameras";
import { getCameraInfo } from "../helpers/http/getCameraInfo";

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

  const login = async (inputs) => {
    await postLogin(inputs, setUserData);
  };

  const fetchCameras = async () => {
    await getCameras(setCameras);
  };

  const fetchCameraInfo = async () => {
    await getCameraInfo(setCameraInfo);
  };

  useEffect(() => {
    if (userData) {
      fetchCameras();
      fetchCameraInfo();
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

  return (
    <DataContext.Provider
      value={{ userData, login, setUserData, cameras, cameraInfo }}
    >
      {children}
    </DataContext.Provider>
  );
};
