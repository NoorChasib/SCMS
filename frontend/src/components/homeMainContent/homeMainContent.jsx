import { Grid, Container, Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import ThemeContext from "../../contexts/themeContext";
import { useContext } from "react";
import VideoPlayer from "../liveVideo/liveVideo";

const HomeMainContent = () => {
  const { cameras, cameraInfo } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        {cameras &&
          cameraInfo &&
          cameras.map((camera) => {
            const currentCameraInfo = cameraInfo.find(
              (info) => info.camera_id === camera.id,
            );
            const videoUrl = currentCameraInfo ? currentCameraInfo.url : "";

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
