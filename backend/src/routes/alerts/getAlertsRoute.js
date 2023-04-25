// Import necessary modules and packages
import express from "express";
import {
  getAllAlerts,
  getAlertsByCamera,
} from "../../controllers/alerts/getAlertsController.js";

// Initialize an Express router
const router = express.Router();

// Define the routes for getting alerts
router.get("/alerts", getAllAlerts);
router.get("/alerts/:camera_id", getAlertsByCamera);

// Export the router
export default router;
