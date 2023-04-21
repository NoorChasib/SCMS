// Import necessary modules and packages
import express from "express";
import { Register } from "../../controllers/auth/registerController.js";

// Create an instance of the Router class from the Express.js framework
const router = express.Router();

// Define a route for user registration and map it to the Register controller function
router.post("/register", Register);

// Export the router object for use in other parts of the application
export default router;
