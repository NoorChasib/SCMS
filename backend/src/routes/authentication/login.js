// Import necessary modules and packages
import express from "express";
import { Login } from "../../controllers/authentication/login.js";

// Create an instance of the Router class from the Express.js framework
const router = express.Router();

// Define a route for user login and map it to the Login controller function
router.post("/login", Login);

// Export the router object for use in other parts of the application
export default router;
