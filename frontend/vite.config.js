import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10),
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.VITE_BACKEND_PORT}/`,
        changeOrigin: true,
      },
    },
  },
});
