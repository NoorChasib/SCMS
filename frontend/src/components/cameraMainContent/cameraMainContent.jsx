import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Grid, Skeleton, Container } from "@mantine/core";
import { DataContext } from "../../contexts/dataContext";
import LiveVideoPlayer from "../liveVideo/liveVideo";

const CameraMainContent = () => {
  const { cameras, cameraInfo } = useContext(DataContext);
  const { id } = useParams(); // Get the camera id from the URL

  // Find the corresponding camera and cameraInfo
  const camera = cameras && cameras.find((cam) => cam.id === parseInt(id));
  const currentCameraInfo = cameraInfo.find(
    (info) => info.camera_id === parseInt(id),
  );
  const videoUrl = currentCameraInfo ? currentCameraInfo.url : "";

  return (
    <Container size="2xl" py="md">
      <Grid grow gutter="xl" gutterMd={50}>
        <Grid.Col md={10} lg={10}>
          {camera && (
            <LiveVideoPlayer
              key={videoUrl}
              src={videoUrl}
              type="application/x-mpegURL"
            />
          )}
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
