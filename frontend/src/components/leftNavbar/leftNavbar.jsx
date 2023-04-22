import { Navbar, Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconVideo, IconCamera } from "@tabler/icons-react";

const LeftNavbar = ({ opened, setOpened }) => {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 300 }}>
      <div className="h-full bg-blue-300 p-4 text-white">
        <Navbar.Section>
          <Button
            leftIcon={<IconCamera />}
            radius="lg"
            size="md"
            fullWidth
            uppercase
            variant="subtle"
            color="dark"
            component={Link}
            to="/"
            onClick={() => setOpened((o) => !o)}
          >
            All Cameras
          </Button>
        </Navbar.Section>

        <Divider my="sm" />

        <Navbar.Section my="xl">
          <Button
            leftIcon={<IconVideo />}
            radius="lg"
            size="md"
            fullWidth
            variant="subtle"
            color="dark"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Camera 1
          </Button>
        </Navbar.Section>

        <Navbar.Section my="xl">
          <Button
            leftIcon={<IconVideo />}
            radius="lg"
            size="md"
            fullWidth
            variant="subtle"
            color="dark"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Camera 2
          </Button>
        </Navbar.Section>

        <Navbar.Section my="xl">
          <Button
            leftIcon={<IconVideo />}
            radius="lg"
            size="md"
            fullWidth
            variant="subtle"
            color="dark"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Camera 3
          </Button>
        </Navbar.Section>
      </div>
    </Navbar>
  );
};

export default LeftNavbar;
