// Import necessary modules and packages
import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { format, addSeconds } from "date-fns";

// Define the RecordedVideoPlayer component
const RecordedVideoPlayer = ({ src, type, startTimeOffset }) => {
  // Create a reference to the video element
  const videoRef = useRef(null);

  // Define a state variable for the local time
  const [localTime, setLocalTime] = useState(
    addSeconds(new Date(), -startTimeOffset),
  );

  // Define a function to format the local time
  const formattedLocalTime = () =>
    format(localTime, "MMM dd yyyy - hh:mm:ss a");

  useEffect(() => {
    // Initialize the video player
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: "muted",
      preload: "true",
      fluid: true,
      loop: false,
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

    // Update the local time based on the video playback time
    const updateTime = () => {
      setLocalTime((prevTime) =>
        addSeconds(
          new Date(),
          player.currentTime() -
            (isFinite(startTimeOffset) ? startTimeOffset : 0),
        ),
      );
    };

    player.on("timeupdate", updateTime);

    // Cleanup function to run when the component unmounts
    return () => {
      player.off("timeupdate", updateTime);
      player.dispose();
    };
  }, [src, type, startTimeOffset]);

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

export default RecordedVideoPlayer;
