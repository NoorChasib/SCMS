// Import necessary modules and packages
import express from "express";
import { postAlert } from "../../controllers/alerts/postAlertController.js";

// Initialize an Express router
const router = express.Router();

// Define the route for creating a new alert
router.post("/alerts/:camera_id", postAlert);

// Export the router
export default router;
