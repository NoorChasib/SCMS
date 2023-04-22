import { Header, Text, MediaQuery, Burger, Group, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconFingerprint } from "@tabler/icons-react";

const HomeTopHeader = ({ opened, setOpened }) => {
  return (
    <Header height={{ base: 60 }} withBorder={false}>
      <div className="flex h-full items-center bg-blue-700 text-white shadow-sm sm:justify-start sm:pl-4">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            color="white"
            size="md"
            mr="xl"
          />
        </MediaQuery>

        <Link to="/">
          <Group className="pl-4 sm:p-0">
            <div className="flex items-center justify-center gap-2">
              <IconFingerprint size={30} />
              <Text fz="xl" className="font-bold">SCMS</Text>
            </div>
          </Group>
        </Link>

        <Text fz="xl" className="flex-1 text-center font-bold">
          Overview
        </Text>
      </div>
    </Header>
  );
};

export default HomeTopHeader;
