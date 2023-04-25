// Import necessary modules and packages
import React, { useRef, useEffect, useState, useContext } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { format, addSeconds } from "date-fns";
import initObjectDetector from "../../helpers/objectDetection/objectDetection";
import checkBlackPixels from "../../helpers/offlineDetection/offlineDetection";
import {
  alertNotificationWithTimeout,
  offlineNotificationWithTimeout,
} from "../../helpers/notifications";
import { DataContext } from "../../contexts/dataContext";

// Define the LiveVideoPlayer component
const LiveVideoPlayer = ({ src, type, cameraName, camera_id }) => {
  // Create a reference to the video element
  const videoRef = useRef(null);

  // Define a state variable for the local time
  const [localTime, setLocalTime] = useState(new Date());

  // Get the inputAlert value from the data context
  const { inputAlert } = useContext(DataContext);

  // Define a function to format the local time
  const formattedLocalTime = () =>
    format(localTime, "MMM dd yyyy - hh:mm:ss a");

  useEffect(() => {
    // Initialize the video player
    const player = videojs(videoRef.current, {
      controls: false,
      autoplay: "muted",
      preload: "true",
      fluid: true,
      loop: true,
      liveui: true,
      html5: {
        hls: {
          overrideNative: true,
        },
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
      },
    });

    // Set the video source
    player.src([{ src, type }]);

    // Initialize the object detection helper
    initObjectDetector(videoRef, (predictions) => {
      // If there are any predictions, trigger an alert notification
      if (predictions && predictions.length > 0) {
        alertNotificationWithTimeout(camera_id, cameraName, inputAlert);
      }

      // Check for black pixels and trigger an offline notification if necessary
      const isOffline = checkBlackPixels(videoRef.current, 0.7);
      if (isOffline) {
        offlineNotificationWithTimeout(camera_id, cameraName, inputAlert);
      }
    });

    // Load the saved playback time from local storage and set it
    const savedTime = localStorage.getItem("videoPlaybackTime");
    if (savedTime) {
      player.currentTime(parseFloat(savedTime) || 1170);
    }

    // Save the playback time to local storage before the page unloads
    const handleBeforeUnload = () => {
      const loopedTime = isFinite(player.duration())
        ? player.currentTime() % player.duration()
        : player.currentTime();
      localStorage.setItem("videoPlaybackTime", loopedTime);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to run when the component unmounts
    return () => {
      // Save the playback time to local storage when the component unmounts
      const loopedTime = isFinite(player.duration())
        ? player.currentTime() % player.duration()
        : player.currentTime();
      localStorage.setItem("videoPlaybackTime", loopedTime);

      // Dispose of the video player and remove the event listener
      player.dispose();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [src, type]);

  // Update the local time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalTime((prevTime) => addSeconds(prevTime, 1));
    }, 1000);

    // Cleanup function to run when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Render the video player and local time display
  return (
    <div data-vjs-player className="relative">
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
      <div className="absolute bottom-2 left-2 rounded bg-gray-800 bg-opacity-60 px-2 py-1 text-sm text-white">
        {formattedLocalTime()}
      </div>
    </div>
  );
};

export default LiveVideoPlayer;
