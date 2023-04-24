import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { format, addSeconds } from "date-fns";

const RecordedVideoPlayer = ({ src, type, startTimeOffset }) => {
  const videoRef = useRef(null);
  const [localTime, setLocalTime] = useState(
    addSeconds(new Date(), -startTimeOffset),
  );

  const formattedLocalTime = () =>
    format(localTime, "MMM dd yyyy - hh:mm:ss a");

  useEffect(() => {
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

    player.src([{ src, type }]);

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

    return () => {
      player.off("timeupdate", updateTime);
      player.dispose();
    };
  }, [src, type, startTimeOffset]);

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
