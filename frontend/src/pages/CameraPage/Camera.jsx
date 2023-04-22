import { AppShell } from "@mantine/core";
import LeftNavbar from "../../components/leftNavbar/leftNavbar";
import TopHeader from "../../components/topHeader/topHeader";
import CameraMainContent from "../../components/cameraMainContent/cameraMainContent";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/themeContext";

const Camera = () => {
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
      <CameraMainContent />
    </AppShell>
  );
};

export default Camera;
