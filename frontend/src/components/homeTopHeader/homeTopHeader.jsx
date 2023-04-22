import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Group,
  Avatar,
  Title,
} from "@mantine/core";
import logo from "/logo.svg";

const HomeTopHeader = ({ opened, setOpened }) => {
  return (
    <Header height={{ base: 60 }}>
      <div className="flex h-full items-center justify-center bg-gray-200 sm:justify-start sm:pl-4">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Group align="center">
          <Avatar src={logo} alt="no image here" />
          <Text>SCMS</Text>
        </Group>

        <Text>Overview</Text>
      </div>
    </Header>
  );
};

export default HomeTopHeader;
