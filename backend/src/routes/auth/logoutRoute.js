// Import necessary modules and packages
import express from "express";
import { Logout } from "../../controllers/auth/logoutController.js";

// Create an instance of the Router class from the Express.js framework
const router = express.Router();

// Define a route for user logout and map it to the Logout controller function
router.post("/logout", Logout);

// Export the router object for use in other parts of the application
export default router;
