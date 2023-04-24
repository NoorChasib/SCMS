import express from "express";
import { postAlert } from "../../controllers/alerts/postAlertController.js";

const router = express.Router();

router.post("/alerts/:camera_id", postAlert);

export default router;
