import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Import Routes
import landingRoutes from "./src/routes/landing/landing.js";

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000",
  }),
);
app.use(cookieParser());

// Routes
app.use("/", landingRoutes);

// Start Server
app.listen(3000, () => console.log("Server started on port 3000"));
