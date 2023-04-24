import express from "express";
import {
  getAllAlerts,
  getAlertsByCamera,
} from "../../controllers/alerts/getAlertsController.js";

const router = express.Router();

router.get("/alerts", getAllAlerts);
router.get("/alerts/:camera_id", getAlertsByCamera);

export default router;
