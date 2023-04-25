import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import chimeSound from "/sounds/chime.mp3";

const chime = new Audio(chimeSound);

const recentlyNotifiedCameras = new Set();

const notifyWithTimeout = (notificationFunction, cameraName, timeout) => {
  if (!recentlyNotifiedCameras.has(cameraName)) {
    recentlyNotifiedCameras.add(cameraName);
    notificationFunction(cameraName);

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

export const alertNotificationWithTimeout = (cameraName, timeout = 15000) => {
  notifyWithTimeout(alertNotification, cameraName, timeout);
};

export const offlineNotificationWithTimeout = (cameraName, timeout = 30000) => {
  notifyWithTimeout(offlineNotification, cameraName, timeout);
};
