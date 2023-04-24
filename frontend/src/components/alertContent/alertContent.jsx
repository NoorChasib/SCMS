import React, { useContext, useState } from "react";
import {
  Avatar,
  Container,
  Group,
  ScrollArea,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import ThemeContext from "../../contexts/themeContext";
import { IconAlertCircle } from "@tabler/icons-react";
import { DataContext } from "../../contexts/dataContext";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const AlertContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const { allAlerts } = useContext(DataContext);
  const [selectedAlertType, setSelectedAlertType] = useState("all");
  const { id } = useParams(); // Get cameraId from URL path

  const data = [
    { value: "all", label: "All Alerts" },
    { value: "intruder", label: "Intruders" },
    { value: "offline", label: "Offline" },
  ];

  const handleAlertTypeChange = (value) => {
    setSelectedAlertType(value);
  };

  const formatAlertTime = (alertTime) => {
    return format(new Date(alertTime), "MMM d yyyy - hh:mm:ss a");
  };

  // Filter alerts by cameraId and selected alert type, and reverse the order
  const filteredAlerts = allAlerts
    .filter(
      (alert) =>
        alert.camera_id === parseInt(id) &&
        (selectedAlertType === "all" || alert.alert_type === selectedAlertType),
    )
    .reverse();

  return (
    <Container size="2xl" py="xs" className="rounded-lg border">
      <Select
        dropdownPosition="bottom"
        data={data}
        defaultValue="all"
        variant="unstyled"
        mb="xs"
        px="md"
        onChange={handleAlertTypeChange}
        icon={<IconAlertCircle size={25} color="red" />}
        styles={() => ({
          root: {
            backgroundColor: darkMode ? "#1A1B1E" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          },
          input: {
            color: darkMode ? "#ffffff" : "#000000",
          },
        })}
      />
      <ScrollArea h={250} type="never">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`m-2 flex rounded-lg hover:shadow-lg ${
              darkMode ? "hover:shadow-gray-700" : "hover:shadow-gray-200"
            }`}
          >
            <UnstyledButton
              variant="link"
              color="blue"
              m="xs"
              className="max-w-100 w-full"
            >
              <Group>
                <Avatar size={40} color="red">
                  {alert.alert_type.toUpperCase().slice(0, 3)}
                </Avatar>
                <Text c={darkMode ? "white" : "black"}>
                  {formatAlertTime(alert.start_time)}
                </Text>
              </Group>
            </UnstyledButton>
          </div>
        ))}
      </ScrollArea>
    </Container>
  );
};

export default AlertContent;
