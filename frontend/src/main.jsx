import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { AuthContextProvider } from "./contexts/authContext";
import { ThemeProvider } from "./contexts/themeContext";
import { Notifications } from "@mantine/notifications";

const appendCache = createEmotionCache({ key: "mantine", prepend: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthContextProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Inter, sans-serif",
          breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em",
          },
        }}
        emotionCache={appendCache}
      >
        <Notifications />
        <App />
      </MantineProvider>
    </AuthContextProvider>
  </ThemeProvider>,
);
