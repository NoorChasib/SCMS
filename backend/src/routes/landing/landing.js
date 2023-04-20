// Import necessary modules and packages
import express from "express";
import { Landing } from "../../controllers/landing/landing.js";

// Create an instance of the Router class from the Express.js framework
const router = express.Router();

// Define a route for the landing page and map it to the Landing controller function
router.get("/", Landing);

// Export the router object for use in other parts of the application
export default router;
