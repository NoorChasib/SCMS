// Import necessary modules and packages
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, ActionIcon, Text, Group } from "@mantine/core";
import { DataContext } from "../../contexts/dataContext";
import LiveVideoPlayer from "../liveVideo/liveVideo";
import RecordedVideoPlayer from "../recordedVideo/recordedVideo";
import ThemeContext from "../../contexts/themeContext";
import { IconLivePhoto, IconLivePhotoOff } from "@tabler/icons-react";
import AlertContent from "../alertContent/alertContent";
import GraphContent from "../graphContent/graphContent";

// This component is used to display the main content of a specific camera, including a video player, alerts, and graphs.
const CameraMainContent = () => {
  // Access the cameras, cameraInfo, and fetchAllAlerts function from the DataContext, and the camera ID from the URL.
  const { cameras, cameraInfo, fetchAllAlerts } = useContext(DataContext);
  const { id } = useParams();

  // Access the current theme mode.
  const { darkMode } = useContext(ThemeContext);

  // Determine whether the video is live or recorded, and set the default to recorded.
  const [recorded, setRecorded] = useState(true);

  // Fetch all alerts when the component is first mounted.
  useEffect(() => {
    fetchAllAlerts();
  }, []);

  // Find the corresponding camera and cameraInfo, and get the video URL and camera name.
  const camera = cameras && cameras.find((cam) => cam.id === parseInt(id));
  const currentCameraInfo = cameraInfo.find(
    (info) => info.camera_id === parseInt(id),
  );
  const videoUrl = currentCameraInfo ? currentCameraInfo.url : "";
  const cameraName = camera ? camera.name : "";

  // Render the component.
  return (
    <Container size="2xl" py="md">
      {/* Display an ActionIcon component and Text component to toggle between live and recorded video. */}
      <Group position="left" spacing="xs">
        <ActionIcon
          color={recorded ? "red" : "blue"}
          size="lg"
          radius="xl"
          variant="subtle"
          onClick={() => setRecorded((r) => !r)}
        >
          {recorded ? (
            <IconLivePhoto size={30} />
          ) : (
            <IconLivePhotoOff size={30} />
          )}
        </ActionIcon>
        <Text c={darkMode ? "white" : "black"} fw={700} ta="center">
          {recorded ? "Live" : "Pre-Recorded"}
        </Text>
      </Group>
      {/* Display a Grid component containing the video player, alerts, and graphs. */}
      <Grid grow gutter="xl" gutterMd={50}>
        <Grid.Col md={10} lg={10}>
          {camera &&
            (recorded ? (
              <LiveVideoPlayer
                key={videoUrl}
                src={videoUrl}
                type="application/x-mpegURL"
                cameraName={cameraName}
                camera_id={id}
              />
            ) : (
              <RecordedVideoPlayer
                key={videoUrl}
                src={videoUrl}
                type="application/x-mpegURL"
                startTimeOffset={2400}
              />
            ))}
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <AlertContent />
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <GraphContent />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CameraMainContent;
