import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { AuthContextProvider } from "./context/authContext";

const appendCache = createEmotionCache({ key: "mantine", prepend: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <MantineProvider
      emotionCache={appendCache}
      theme={{ fontFamily: "Source Sans Pro, sans-serif" }}
    >
      <App />
    </MantineProvider>
  </AuthContextProvider>,
);
