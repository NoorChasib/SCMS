import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import chimeSound from "/sounds/chime.mp3";

const chime = new Audio(chimeSound);

export const alertNotification = () => {
  notifications.show({
    title: "Alert!",
    message: "Intruder detected on Camera #!",
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

export const offlineNotification = () => {
  notifications.show({
    title: "Alert!",
    message: "Camera # is offline!",
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
