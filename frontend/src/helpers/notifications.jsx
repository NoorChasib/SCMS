// Import necessary modules and packages
import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import chimeSound from "/sounds/chime.mp3";

// Create a new Audio object using the chime sound
const chime = new Audio(chimeSound);

// Create a new Set to keep track of recently notified cameras
const recentlyNotifiedCameras = new Set();

// Define a function that sends a notification and calls a callback after a specified timeout
const notifyWithTimeout = (
  notificationFunction,
  cameraName,
  timeout,
  callback,
) => {
  // If this camera has not been recently notified, add it to the recentlyNotifiedCameras set and send a notification
  if (!recentlyNotifiedCameras.has(cameraName)) {
    recentlyNotifiedCameras.add(cameraName);
    notificationFunction(cameraName);
    callback();

    // Remove the camera from the recentlyNotifiedCameras set after the specified timeout
    setTimeout(() => {
      recentlyNotifiedCameras.delete(cameraName);
    }, timeout);
  }
};

// Define a function that sends an alert notification for a specific camera
const alertNotification = (cameraName) => {
  // Show a red notification with an alert icon and a message indicating an intruder was detected on the specified camera
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
  // Play the chime sound
  chime.play();
};

// Define a function that sends an offline notification for a specific camera
const offlineNotification = (cameraName) => {
  // Show a red notification with an alert icon and a message indicating the specified camera is offline
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
  // Play the chime sound
  chime.play();
};

// Define a function that sends an alert notification for a specific camera, with a specified timeout and alert data
export const alertNotificationWithTimeout = (
  camera_id,
  cameraName,
  inputAlert,
  timeout = 15000,
) => {
  // Define the alert data
  const alertData = {
    alert_type: "intruder",
    start_time: new Date().toUTCString(),
  };

  // Send the alert notification with the specified timeout and alert data, and call the inputAlert callback function
  notifyWithTimeout(alertNotification, cameraName, timeout, () => {
    inputAlert(camera_id, alertData);
  });
};

// Define a function that sends an offline notification for a specific camera, with a specified timeout and alert data
export const offlineNotificationWithTimeout = (
  camera_id,
  cameraName,
  inputAlert,
  timeout = 30000,
) => {
  // Define the alert data
  const alertData = {
    alert_type: "offline",
    start_time: new Date().toUTCString(),
  };

  // Send the offline notification with the specified timeout and alert data, and call the inputAlert callback function
  notifyWithTimeout(offlineNotification, cameraName, timeout, () => {
    inputAlert(camera_id, alertData);
  });
};
