// Import the necessary modules and controllers
import express from "express";
import { getCameraInfo } from "../../controllers/cameras/getCameraInfoController.js";

// Create a new router
const router = express.Router();

// Define the routes for the router
router.get("/camera-info", getCameraInfo);

// Export the router
export default router;
