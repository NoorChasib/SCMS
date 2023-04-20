import express from "express";
import { Landing } from "../../controllers/landing/landing.js";

const router = express.Router();

router.get("/", Landing);

export default router;
