// Import necessary modules and packages
import { Navbar, Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconVideo, IconCamera, IconLogout } from "@tabler/icons-react";
import { DataContext } from "../../contexts/dataContext";
import { useContext } from "react";

// This component is used to display the left-hand navbar on the home page, including links to all cameras and individual cameras, as well as a logout button.
const LeftNavbar = ({ opened, setOpened }) => {
  // Access user data and camera data from the DataContext
  const { userData, cameras } = useContext(DataContext);

  // Render the component
  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      withBorder={false}
      width={{ sm: 235, lg: 300 }}
    >
      <div className="h-full bg-blue-700 p-4 text-white">
        {/* Render the top navbar */}
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

        {/* Render the middle navbar with links to each camera */}
        {cameras &&
          cameras.map((camera) => (
            <Navbar.Section key={camera.id} my="xl">
              <Button
                leftIcon={<IconVideo />}
                radius="md"
                size="md"
                fullWidth
                variant="subtle"
                component={Link}
                to={`/camera/${camera.id}`}
                onClick={() => setOpened((o) => !o)}
              >
                {camera.name}
              </Button>
            </Navbar.Section>
          ))}

        {/* Render the bottom navbar with the logout button */}
        <Navbar.Section className="absolute bottom-5 w-full pr-8">
          <Button
            leftIcon={<IconLogout />}
            radius="md"
            size="md"
            fullWidth
            uppercase
            variant="white"
            color="dark"
            component={Link}
            to="/logout"
            onClick={() => setOpened((o) => !o)}
          >
            {userData.username}
          </Button>
        </Navbar.Section>
      </div>
    </Navbar>
  );
};

export default LeftNavbar;
