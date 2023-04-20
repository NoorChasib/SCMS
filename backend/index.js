import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Import Routes
import landingRoute from "./src/routes/landing/landing.js";
import registerRoute from "./src/routes/authentication/register.js";
import loginRoute from "./src/routes/authentication/login.js";
import logoutRoute from "./src/routes/authentication/logout.js";

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  }),
);
app.use(cookieParser());

// Routes
app.use("/", landingRoute);
app.use("/api/", registerRoute);
app.use("/api/", loginRoute);
app.use("/api/", logoutRoute);

// Start Server
app.listen(3000, () => console.log("Server started on port 3000"));
