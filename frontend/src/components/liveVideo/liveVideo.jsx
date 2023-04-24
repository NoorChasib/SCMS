import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { format, addSeconds } from "date-fns";

const LiveVideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [localTime, setLocalTime] = useState(new Date());

  const formattedLocalTime = () =>
    format(localTime, "MMM dd yyyy - hh:mm:ss a");

  useEffect(() => {
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

    player.src([{ src, type }]);

    // Load the saved playback time from local storage and set it
    const savedTime = localStorage.getItem("videoPlaybackTime");
    if (savedTime) {
      player.currentTime(parseFloat(savedTime));
    }

    // Save the playback time to local storage before the page unloads
    const handleBeforeUnload = () => {
      const loopedTime = isFinite(player.duration())
        ? player.currentTime() % player.duration()
        : player.currentTime();
      localStorage.setItem("videoPlaybackTime", loopedTime);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Save the playback time to local storage when the component unmounts
      const loopedTime = isFinite(player.duration())
        ? player.currentTime() % player.duration()
        : player.currentTime();
      localStorage.setItem("videoPlaybackTime", loopedTime);
      player.dispose();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [src, type]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalTime((prevTime) => addSeconds(prevTime, 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
