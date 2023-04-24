import React, { useContext, useState } from "react";
import { Box, Container, Select } from "@mantine/core";
import ThemeContext from "../../contexts/themeContext";
import { IconChartBar } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ArcElement, PieController, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, PieController, Tooltip, Legend);

const GraphContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const { allAlerts } = useContext(DataContext);
  const { id } = useParams();
  const [selectedGraphType, setSelectedGraphType] = useState("all");

  const data = [
    { value: "all", label: "All Time" },
    { value: "5min", label: "Last 5 min" },
    { value: "10min", label: "Last 10 min" },
    { value: "30min", label: "Last 30 min" },
    { value: "1hour", label: "Last hour" },
    { value: "1day", label: "Last day" },
  ];

  const filteredAlerts = allAlerts.filter(
    (alert) => alert.camera_id === parseInt(id),
  );

  const generateChartData = () => {
    const filteredData = filteredAlerts.filter((alert) => {
      if (selectedGraphType === "all") return true;

      const alertTime = new Date(alert.start_time + "Z");
      const currentTime = new Date();
      const timeDifference = currentTime - alertTime;

      const timeFilterMap = {
        "5min": 5 * 60 * 1000,
        "10min": 10 * 60 * 1000,
        "30min": 30 * 60 * 1000,
        "1hour": 60 * 60 * 1000,
        "1day": 24 * 60 * 60 * 1000,
      };
      return timeDifference <= timeFilterMap[selectedGraphType];
    });

    const intruderCount = filteredData.filter(
      (alert) => alert.alert_type === "intruder",
    ).length;

    const offlineCount = filteredData.filter(
      (alert) => alert.alert_type === "offline",
    ).length;

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

  const handleGraphTypeChange = (value) => {
    setSelectedGraphType(value);
  };

  return (
    <Container size="2xl" py="xs" className="rounded-lg border">
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
