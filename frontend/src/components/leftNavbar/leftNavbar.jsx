import { Navbar, Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconVideo, IconCamera, IconLogout } from "@tabler/icons-react";

const LeftNavbar = ({ opened, setOpened }) => {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 235, lg: 300 }}>
      <div className="h-full bg-blue-700 p-4 text-white">
        <Navbar.Section>
          <Button
            leftIcon={<IconCamera />}
            radius="md"
            size="md"
            fullWidth
            uppercase
            variant="white"
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
            radius="md"
            size="md"
            fullWidth
            variant="subtle"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Left Camera
          </Button>
        </Navbar.Section>

        <Navbar.Section my="xl">
          <Button
            leftIcon={<IconVideo />}
            radius="md"
            size="md"
            fullWidth
            variant="subtle"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Center Camera
          </Button>
        </Navbar.Section>

        <Navbar.Section my="xl">
          <Button
            leftIcon={<IconVideo />}
            radius="md"
            size="md"
            fullWidth
            variant="subtle"
            component={Link}
            to="/camera"
            onClick={() => setOpened((o) => !o)}
          >
            Right Camera
          </Button>
        </Navbar.Section>

        <Navbar.Section className="absolute bottom-5 w-full pr-8">
          <Button
            leftIcon={<IconLogout />}
            radius="md"
            size="md"
            fullWidth
            variant="white"
            color="dark"
            component={Link}
            to="/logout"
            onClick={() => setOpened((o) => !o)}
          >
            Username
          </Button>
        </Navbar.Section>
      </div>
    </Navbar>
  );
};

export default LeftNavbar;
