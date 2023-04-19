import "./index.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div classname="app">App!</div>
    </MantineProvider>
  );
}

export default App;
