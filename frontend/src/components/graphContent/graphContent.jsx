import React, { useContext, useState } from "react";
import { Container, ScrollArea, Select } from "@mantine/core";
import ThemeContext from "../../contexts/themeContext";
import { IconChartBar } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";

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
    (alert) =>
      alert.camera_id === parseInt(id) &&
      (selectedGraphType === "all" || alert.alert_type === selectedGraphType),
  );

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
      <ScrollArea h={250} type="never">
        <div
          className={`m-2 flex rounded-lg hover:shadow-lg ${
            darkMode ? "hover:shadow-gray-700" : "hover:shadow-gray-200"
          }`}
        ></div>
      </ScrollArea>
    </Container>
  );
};

export default GraphContent;
