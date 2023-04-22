import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Group,
  ActionIcon,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconFingerprint, IconSun, IconMoonStars } from "@tabler/icons-react";

const TopHeader = ({ opened, setOpened, darkMode, setDarkMode }) => {
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

        <Text className="flex-1 text-center font-bold sm:mr-12 sm:pr-2">
          Overview
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
