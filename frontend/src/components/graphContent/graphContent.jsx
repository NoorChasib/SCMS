// Import necessary modules and packages
import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Select } from "@mantine/core";
import ThemeContext from "../../contexts/themeContext";
import { IconChartBar } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ArcElement, PieController, Tooltip, Legend } from "chart.js";

// Register Chart.js components
Chart.register(ArcElement, PieController, Tooltip, Legend);

// This component is used to display a pie chart of the number of intruder and offline alerts for a specific camera.
const GraphContent = () => {
  // Access the dark mode and fetchAllAlerts function from the DataContext, and the camera ID from the URL.
  const { darkMode } = useContext(ThemeContext);
  const { allAlerts, fetchAllAlerts } = useContext(DataContext);
  const { id } = useParams();

  // Determine the selected graph type and set the default to "all".
  const [selectedGraphType, setSelectedGraphType] = useState("all");

  // Define the data for the time filters.
  const data = [
    { value: "all", label: "All Time" },
    { value: "5min", label: "Last 5 min" },
    { value: "10min", label: "Last 10 min" },
    { value: "30min", label: "Last 30 min" },
    { value: "1hour", label: "Last hour" },
    { value: "1day", label: "Last day" },
  ];

  // Filter the alerts by camera ID.
  const filteredAlerts = allAlerts.filter(
    (alert) => alert.camera_id === parseInt(id),
  );

  // Generate the chart data based on the selected graph type.
  const generateChartData = () => {
    // Filter alerts based on the selected time range
    const filteredData = filteredAlerts.filter((alert) => {
      if (selectedGraphType === "all") return true;
      // Get the time difference between the alert time and current time
      const alertTime = new Date(alert.start_time + "Z");
      const currentTime = new Date();
      const timeDifference = currentTime - alertTime;

      // Map the selected time range to its corresponding milliseconds value
      const timeFilterMap = {
        "5min": 5 * 60 * 1000,
        "10min": 10 * 60 * 1000,
        "30min": 30 * 60 * 1000,
        "1hour": 60 * 60 * 1000,
        "1day": 24 * 60 * 60 * 1000,
      };
      return timeDifference <= timeFilterMap[selectedGraphType];
    });

    // Count the number of intruder and offline alerts
    const intruderCount = filteredData.filter(
      (alert) => alert.alert_type === "intruder",
    ).length;

    const offlineCount = filteredData.filter(
      (alert) => alert.alert_type === "offline",
    ).length;
    // Return the chart data object
    return {
      labels: ["Intruder", "Offline"],
      datasets: [
        {
          data: [intruderCount, offlineCount],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

  // Handle changes to the selected time range
  const handleGraphTypeChange = (value) => {
    setSelectedGraphType(value);
  };

  // Fetch all alerts when the component mounts
  useEffect(() => {
    fetchAllAlerts();
  }, []);

  // Render the component
  return (
    <Container size="2xl" py="xs" className="rounded-lg border">
      {/* Render the time range select dropdown */}
      <Select
        dropdownPosition="bottom"
        data={data}
        defaultValue="all"
        variant="unstyled"
        onChange={handleGraphTypeChange}
        mb="xs"
        px="md"
        icon={<IconChartBar size={25} color="blue" />}
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
      {/* Render the chart */}
      <Box
        h={300}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Pie
          data={generateChartData()}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </Box>
    </Container>
  );
};

export default GraphContent;
