import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { format, addSeconds } from "date-fns";

const RecordedVideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [localTime, setLocalTime] = useState(new Date());

  const formattedLocalTime = () =>
    format(localTime, "MMM dd yyyy - hh:mm:ss a");

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
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

    return () => {
      player.dispose();
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

export default RecordedVideoPlayer;
