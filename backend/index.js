// Import necessary modules and packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serverConfig } from "./connect.js";

// Create an instance of the Express application
const app = express();

// Import routes for the application
import landingRoute from "./src/routes/landing/landing.js";
import registerRoute from "./src/routes/authentication/register.js";
import loginRoute from "./src/routes/authentication/login.js";
import logoutRoute from "./src/routes/authentication/logout.js";

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

// Register routes for the application
app.use("/", landingRoute); // Register the landing page route
app.use("/api/", registerRoute); // Register the user registration route
app.use("/api/", loginRoute); // Register the user login route
app.use("/api/", logoutRoute); // Register the user logout route

// Start the server on the backendPort defined in the serverConfig object
app.listen(serverConfig.backendPort, () =>
  console.log(`Server started on port ${serverConfig.backendPort}`),
);
