import { Grid, Skeleton, Container, Box, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import ThemeContext from "../../contexts/themeContext";
import { useContext } from "react";
import VideoPlayer from "../homeLiveVideo/homeLiveVideo";

const HomeMainContent = () => {
  const { userData } = useContext(AuthContext);
  const { cameras, camera_information } = userData || {};
  const { darkMode } = useContext(ThemeContext);

  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        {cameras &&
          camera_information &&
          cameras.map((camera) => {
            const cameraInfo = camera_information.find(
              (info) => info.camera_id === camera.id,
            );
            const videoUrl = cameraInfo ? cameraInfo.url : "";

            return (
              <Grid.Col key={camera.id} lg={5}>
                <Text c={darkMode ? "white" : "black"} fw={700} ta="center">
                  {camera.name}
                </Text>
                <Link to={`/camera/${camera.id}`}>
                  <Box
                    className={`relative cursor-pointer hover:shadow-lg ${
                      darkMode
                        ? "hover:shadow-gray-500"
                        : "hover:shadow-gray-400"
                    }`}
                  >
                    <VideoPlayer src={videoUrl} type="application/x-mpegURL" />
                  </Box>
                </Link>
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
};

export default HomeMainContent;
