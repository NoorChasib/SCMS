// Import necessary modules and packages
import { db } from "../../../connect.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

// Define validation rules for user registration
export const validationRules = [
  check("name").notEmpty().withMessage("Name is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Define the Register function to handle user registration
export const Register = async (req, res) => {
  // Check for validation errors and return them if present
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Get the username from the request body
  const username = req.body.username;

  // Check if the user already exists in the database
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    // If there's an error, log it and send a 500 (Internal Server Error) response
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    // If the user already exists, send a 409 (Conflict) response
    if (data.length) {
      return res.status(409).json({ error: "This user already exists" });
    }

    // Generate a salt and hash the password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred" });
        }

        // Prepare the user data for insertion into the database
        const values = [
          req.body.name,
          username,
          req.body.email,
          hashedPassword,
        ];

        // Insert the user data into the database
        const q =
          "INSERT INTO users (`name`, `username`, `email`, `password` ) VALUES (?)";
        db.query(q, [values], (err, data) => {
          // If there's an error, log it and send a 500 (Internal Server Error) response
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred" });
          }

          // If successful, send a 200 (OK) response with a success message
          return res.status(200).json({ message: "User has been created" });
        });
      });
    });
  });
};
