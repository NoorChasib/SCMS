import { AppShell } from "@mantine/core";
import LeftNavbar from "../../components/leftNavbar/leftNavbar";
import TopHeader from "../../components/topHeader/topHeader";
import CameraMainContent from "../../components/cameraMainContent/cameraMainContent";
import { useState } from "react";

const Camera = () => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<LeftNavbar opened={opened} setOpened={setOpened} />}
      header={<TopHeader opened={opened} setOpened={setOpened} />}
    >
      <CameraMainContent />
    </AppShell>
  );
};

export default Camera;
