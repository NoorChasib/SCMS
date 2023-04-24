import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Skeleton, Container, ActionIcon, Text } from "@mantine/core";
import { DataContext } from "../../contexts/dataContext";
import LiveVideoPlayer from "../liveVideo/liveVideo";
import RecordedVideoPlayer from "../recordedVideo/recordedVideo";
import ThemeContext from "../../contexts/themeContext";
import { IconLivePhoto, IconLivePhotoOff } from "@tabler/icons-react";

const CameraMainContent = () => {
  const { cameras, cameraInfo } = useContext(DataContext);
  const { id } = useParams(); // Get the camera id from the URL
  const { darkMode } = useContext(ThemeContext);
  const [recorded, setRecorded] = useState(true); // Whether the video is live or recorded

  // Find the corresponding camera and cameraInfo
  const camera = cameras && cameras.find((cam) => cam.id === parseInt(id));
  const currentCameraInfo = cameraInfo.find(
    (info) => info.camera_id === parseInt(id),
  );
  const videoUrl = currentCameraInfo ? currentCameraInfo.url : "";

  return (
    <Container size="2xl" py="md">
      <ActionIcon
        color="red"
        size="lg"
        radius="xl"
        variant="transparent"
        onClick={() => setRecorded((r) => !r)}
      >
        {recorded ? (
          <IconLivePhoto size={30} />
        ) : (
          <IconLivePhotoOff size={30} />
        )}
      </ActionIcon>
      <Text c={darkMode ? "white" : "black"} fw={700} ta="center">
        {recorded ? "🔴 Live" : "🔵 Pre-Recorded"}
      </Text>
      <Grid grow gutter="xl" gutterMd={50}>
        <Grid.Col md={10} lg={10}>
          {camera &&
            (recorded ? (
              <LiveVideoPlayer
                key={videoUrl}
                src={videoUrl}
                type="application/x-mpegURL"
              />
            ) : (
              <RecordedVideoPlayer
                key={videoUrl}
                src={videoUrl}
                type="application/x-mpegURL"
              />
            ))}
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <Skeleton height={450} radius="lg" />
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <Skeleton height={450} radius="lg" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CameraMainContent;
