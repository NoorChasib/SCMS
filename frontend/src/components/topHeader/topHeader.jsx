import { Header, Text, MediaQuery, Burger, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconFingerprint, IconLogout } from "@tabler/icons-react";

const TopHeader = ({ opened, setOpened }) => {
  return (
    <Header height={{ base: 60 }} withBorder={false} fz="lg">
      <div className="flex h-full items-center bg-blue-700 text-white shadow-sm sm:justify-start sm:pl-4">
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

        <Text className="flex-1 text-center font-bold">Overview</Text>

        <Link to="/logout">
          <div className="pr-4 sm:pl-14">
            <IconLogout size={30} />
          </div>
        </Link>
      </div>
    </Header>
  );
};

export default TopHeader;
