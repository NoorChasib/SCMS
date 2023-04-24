import express from "express";
import { putAlert } from "../../controllers/alerts/putAlertController.js";

const router = express.Router();

router.put("/alerts/:camera_id", putAlert);

export default router;
