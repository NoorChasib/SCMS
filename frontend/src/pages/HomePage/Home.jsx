import { AppShell } from "@mantine/core";
import HomeLeftNavbar from "../../components/homeLeftNavbar/homeLeftNavbar";
import HomeTopHeader from "../../components/homeTopHeader/homeTopHeader";
import HomeMainContent from "../../components/homeMainContent/homeMainContent";
import { useState } from "react";

const Home = () => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<HomeLeftNavbar opened={opened} setOpened={setOpened} />}
      header={<HomeTopHeader opened={opened} setOpened={setOpened} />}
    >
      <HomeMainContent />
    </AppShell>
  );
};

export default Home;
