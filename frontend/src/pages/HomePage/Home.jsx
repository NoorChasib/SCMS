import { AppShell } from "@mantine/core";
import LeftNavbar from "../../components/leftNavbar/leftNavbar";
import TopHeader from "../../components/topHeader/topHeader";
import HomeMainContent from "../../components/homeMainContent/homeMainContent";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/themeContext";

const Home = () => {
  const [opened, setOpened] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppShell
      className={darkMode ? "bg-bg-300" : "bg-bg-100"}
      navbarOffsetBreakpoint="sm"
      navbar={<LeftNavbar opened={opened} setOpened={setOpened} />}
      header={
        <TopHeader
          opened={opened}
          setOpened={setOpened}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      }
    >
      <HomeMainContent />
    </AppShell>
  );
};

export default Home;
