// Import necessary modules and packages
import { Grid, Container, Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";
import ThemeContext from "../../contexts/themeContext";
import { useContext } from "react";
import LiveVideoPlayer from "../liveVideo/liveVideo";

// This component is used to display the main content of the home page, including a list of cameras and live video feeds.
const HomeMainContent = () => {
  // Access the camera data and dark mode status from the DataContext and ThemeContext, respectively.
  const { cameras, cameraInfo } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);

  // Render the component
  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        {/* Map through the list of cameras and render a LiveVideoPlayer component for each camera */}
        {cameras &&
          cameraInfo &&
          cameras.map((camera) => {
            // Get the video URL and camera name for the current camera
            const currentCameraInfo = cameraInfo.find(
              (info) => info.camera_id === camera.id,
            );
            const videoUrl = currentCameraInfo ? currentCameraInfo.url : "";
            const cameraName = camera ? camera.name : "";

            // Render the LiveVideoPlayer component for the current camera, wrapped in a link to the camera details page
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
                    <LiveVideoPlayer
                      src={videoUrl}
                      type="application/x-mpegURL"
                      cameraName={cameraName}
                      camera_id={camera.id}
                    />
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
