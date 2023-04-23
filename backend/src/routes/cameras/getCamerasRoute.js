// Import the necessary modules and controllers
import express from "express";
import { getCameras } from "../../controllers/cameras/getCamerasController.js";

// Create a new router
const router = express.Router();

// Define the routes for the router
router.get("/cameras", getCameras);

// Export the router
export default router;
