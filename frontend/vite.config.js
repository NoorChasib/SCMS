import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(import.meta.env.VITE_FRONTEND_PORT, 10),
    proxy: {
      "/api": {
        target: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/`,
        changeOrigin: true,
      },
    },
  },
});
