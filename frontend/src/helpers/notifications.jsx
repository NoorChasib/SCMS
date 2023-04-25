import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import chimeSound from "/sounds/chime.mp3";
import { postAlert } from "./http/postAlert";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";

const chime = new Audio(chimeSound);

const recentlyNotifiedCameras = new Set();

const notifyWithTimeout = (
  notificationFunction,
  cameraName,
  timeout,
  callback,
) => {
  if (!recentlyNotifiedCameras.has(cameraName)) {
    recentlyNotifiedCameras.add(cameraName);
    notificationFunction(cameraName);
    callback();

    setTimeout(() => {
      recentlyNotifiedCameras.delete(cameraName);
    }, timeout);
  }
};

const alertNotification = (cameraName) => {
  notifications.show({
    title: "Alert!",
    message: `Intruder detected on ${cameraName}!`,
    radius: "md",
    icon: <IconAlertCircle size={50} />,
    color: "red",
    autoClose: 10000,
    styles: () => ({
      root: {
        backgroundColor: "#003459",
      },
      title: {
        color: "#ffffff",
        fontSize: "1rem",
      },
      description: {
        color: "#ffffff",
        fontSize: "1rem",
      },
      closeButton: {
        color: "#ffffff",
        "&:hover": { backgroundColor: "#00538F" },
      },
    }),
  });
  chime.play();
};

const offlineNotification = (cameraName) => {
  notifications.show({
    title: "Alert!",
    message: `${cameraName} is offline!`,
    radius: "md",
    icon: <IconAlertCircle size={50} />,
    color: "red",
    autoClose: 10000,
    styles: () => ({
      root: {
        backgroundColor: "#003459",
      },
      title: {
        color: "#ffffff",
        fontSize: "1rem",
      },
      description: {
        color: "#ffffff",
        fontSize: "1rem",
      },
      closeButton: {
        color: "#ffffff",
        "&:hover": { backgroundColor: "#00538F" },
      },
    }),
  });
  chime.play();
};

export const alertNotificationWithTimeout = (
  camera_id,
  cameraName,
  inputAlert,
  timeout = 15000,
) => {
  const alertData = {
    alert_type: "intruder",
    start_time: new Date().toUTCString(),
  };

  notifyWithTimeout(alertNotification, cameraName, timeout, () => {
    inputAlert(camera_id, alertData);
  });
};

export const offlineNotificationWithTimeout = (
  camera_id,
  cameraName,
  inputAlert,
  timeout = 30000,
) => {
  const alertData = {
    alert_type: "offline",
    start_time: new Date().toUTCString(),
  };

  notifyWithTimeout(offlineNotification, cameraName, timeout, () => {
    inputAlert(camera_id, alertData);
  });
};
