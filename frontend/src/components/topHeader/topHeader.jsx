// Import necessary modules and packages
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Group,
  ActionIcon,
} from "@mantine/core";
import { Link, useLocation, useParams } from "react-router-dom";
import { IconFingerprint, IconSun, IconMoonStars } from "@tabler/icons-react";
import { DataContext } from "../../contexts/dataContext";
import ThemeContext from "../../contexts/themeContext";
import { useContext } from "react";

// Define the TopHeader component
const TopHeader = ({ opened, setOpened }) => {
  // Get the cameras data from the data context
  const { cameras } = useContext(DataContext);

  // Get the dark mode state and setter from the theme context
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Get the current location and camera id (if applicable)
  const location = useLocation();
  const { id } = useParams();

  // Determine whether the current path is a camera path
  const isCameraPath = location.pathname.startsWith("/camera");

  // Get the display text for the header based on the current location
  const getCameraName = (id) => {
    const camera = cameras.find((camera) => camera.id === parseInt(id));
    return camera ? camera.name : "";
  };

  const displayText = isCameraPath ? getCameraName(id) : "Overview";

  // Render the top header component
  return (
    <Header height={{ base: 60 }} withBorder={false} fz="lg">
      <div className="flex h-full items-center bg-blue-700 text-white shadow-lg sm:justify-start sm:pl-4">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            color="white"
            size="md"
            mr="sm"
          />
        </MediaQuery>

        <Link to="/">
          <Group className="pl-4 sm:p-0">
            <div className="flex items-center justify-center gap-4">
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <IconFingerprint size={30} />
              </MediaQuery>
              <Text className="font-bold">SCMS</Text>
            </div>
          </Group>
        </Link>

        <Text className="flex-1 text-center font-bold sm:mr-12 sm:pr-6">
          {displayText}
        </Text>

        <Group className="pr-4 sm:pr-2">
          <ActionIcon
            color={darkMode ? "yellow" : "blue"}
            size="lg"
            radius="xl"
            variant="transparent"
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? <IconSun size={30} /> : <IconMoonStars size={30} />}
          </ActionIcon>
        </Group>
      </div>
    </Header>
  );
};

export default TopHeader;
