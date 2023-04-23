// Import necessary modules and packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serverConfig } from "./dbConnect.js";

// Create an instance of the Express application
const app = express();

// Import routes for the application
import landingRoute from "./src/routes/landing/landingRoute.js";
import registerRoute from "./src/routes/auth/registerRoute.js";
import loginRoute from "./src/routes/auth/loginRoute.js";
import logoutRoute from "./src/routes/auth/logoutRoute.js";
import getCamerasRoute from "./src/routes/cameras/getCamerasRoute.js";

// Define middleware functions for the application
app.use((req, res, next) => {
  // Enable sending of cookies with CORS requests
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: `http://localhost:${serverConfig.frontendPort}`, // Set the allowed origin for CORS requests
    credentials: true, // Enable sending of cookies with CORS requests
  }),
);

app.use(cookieParser()); // Parse cookies in incoming requests

// Landing route for the application
app.use("/", landingRoute); // Register the landing page route

// Auth routes for the application
app.use("/api/", registerRoute); // User registration route
app.use("/api/", loginRoute); // User login route
app.use("/api/", logoutRoute); // User logout route

// Camera routes for the application
app.use("/api/", getCamerasRoute); // User cameras route

// Start the server on the backendPort defined in the serverConfig object
app.listen(serverConfig.backendPort, () =>
  console.log(`Server started on port ${serverConfig.backendPort}`),
);
