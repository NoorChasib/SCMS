import express from "express";
import { getLanding } from "../../controllers/landing/landing.js";

const router = express.Router();

router.get("/", getLanding);

export default router;
