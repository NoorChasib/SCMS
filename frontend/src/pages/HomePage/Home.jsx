import { AppShell } from "@mantine/core";
import LeftNavbar from "../../components/leftNavbar/leftNavbar";
import TopHeader from "../../components/topHeader/topHeader";
import HomeMainContent from "../../components/homeMainContent/homeMainContent";
import { useState } from "react";

const Home = () => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<LeftNavbar opened={opened} setOpened={setOpened} />}
      header={<TopHeader opened={opened} setOpened={setOpened} />}
    >
      <HomeMainContent />
    </AppShell>
  );
};

export default Home;
