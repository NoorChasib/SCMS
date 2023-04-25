// Import necessary modules and packages
import express from "express";
import { putAlert } from "../../controllers/alerts/putAlertController.js";

// Initialize an Express router
const router = express.Router();

// Define the route for updating an existing alert
router.put("/alerts/:camera_id", putAlert);

// Export the router
export default router;
