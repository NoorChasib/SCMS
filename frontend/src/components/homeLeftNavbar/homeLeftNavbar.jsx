import { Navbar, Text } from "@mantine/core";

const HomeLeftNavbar = ({ opened }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

export default HomeLeftNavbar;
