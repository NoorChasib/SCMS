// Import necessary modules and packages
import { AppShell } from "@mantine/core";
import LeftNavbar from "../../components/leftNavbar/leftNavbar";
import TopHeader from "../../components/topHeader/topHeader";
import HomeMainContent from "../../components/homeMainContent/homeMainContent";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/themeContext";

// Define the Home component
const Home = () => {
  // Define state for whether the left navbar is opened or closed
  const [opened, setOpened] = useState(false);
  // Get the darkMode value from the ThemeContext
  const { darkMode } = useContext(ThemeContext);

  // Render the AppShell component, passing in the necessary props and components
  return (
    <AppShell
      // Set the background color of the AppShell based on whether dark mode is enabled or not
      className={darkMode ? "bg-bg-300" : "bg-bg-100"}
      navbarOffsetBreakpoint="sm"
      navbar={<LeftNavbar opened={opened} setOpened={setOpened} />}
      header={<TopHeader opened={opened} setOpened={setOpened} />}
    >
      {/* Render the HomeMainContent component */}
      <HomeMainContent />
    </AppShell>
  );
};

export default Home;
