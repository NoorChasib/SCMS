// Import necessary modules and packages
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Group,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import ThemeContext from "../../contexts/themeContext";
import { IconAlertCircle } from "@tabler/icons-react";
import { DataContext } from "../../contexts/dataContext";
import { useParams } from "react-router-dom";
import { format, utcToZonedTime } from "date-fns-tz";

// This component is used to display alerts for a specific camera based on the camera ID passed in through the URL.
const AlertContent = () => {
  // Access the current theme mode from the ThemeContext and fetch all alerts from the DataContext.
  const { darkMode } = useContext(ThemeContext);
  const { allAlerts, fetchAllAlerts } = useContext(DataContext);

  // Access the camera ID passed in through the URL.
  const { id } = useParams();

  // Set the currently selected alert type and define the different alert types that can be selected.
  const [selectedAlertType, setSelectedAlertType] = useState("all");
  const selectData = [
    { value: "all", label: "All Alerts" },
    { value: "intruder", label: "Intruders" },
    { value: "offline", label: "Offline" },
  ];

  // This function handles changes to the selected alert type.
  const handleAlertTypeChange = (value) => {
    setSelectedAlertType(value);
  };

  // This function formats alert times to display in the local time zone.
  const formatAlertTime = (alertTime) => {
    const utcTimeString = alertTime + "Z";
    const utcTime = new Date(utcTimeString);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = utcToZonedTime(utcTime, localTimeZone);
    return format(localTime, "MMM d yyyy - hh:mm:ss aa");
  };

  // Filter alerts by cameraId and selected alert type, and reverse the order
  const filteredAlerts = allAlerts
    .filter(
      (alert) =>
        alert.camera_id === parseInt(id) &&
        (selectedAlertType === "all" || alert.alert_type === selectedAlertType),
    )
    .reverse();

  // Fetch all alerts when the component is first mounted.
  useEffect(() => {
    fetchAllAlerts();
  }, []);

  // Render the component.
  return (
    <Container size="2xl" py="xs" className="rounded-lg border">
      {/* Display a Select component for choosing the alert type. */}
      <Select
        dropdownPosition="bottom"
        data={selectData}
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
      {/* Display a ScrollArea component containing the filtered alerts. */}
      <ScrollArea h={300} type="never">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`m-2 flex rounded-lg hover:shadow-sm ${
              darkMode ? "hover:shadow-gray-700" : "hover:shadow-gray-200"
            }`}
          >
            {/* Display an Avatar component with the first three characters of the alert type as its content, and the formatted alert time. */}
            <Box m="xs" className="max-w-100 w-full cursor-default">
              <Group>
                <Avatar size={40} color="red">
                  {alert.alert_type.toUpperCase().slice(0, 3)}
                </Avatar>
                <Text c={darkMode ? "white" : "black"}>
                  {formatAlertTime(alert.start_time)}
                </Text>
              </Group>
            </Box>
          </div>
        ))}
      </ScrollArea>
    </Container>
  );
};

export default AlertContent;
