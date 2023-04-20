// Import necessary modules and packages
import { db, jwtConfig } from "../../../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the Login function to handle user login
export const Login = (req, res) => {
  // Define a query to retrieve the user's information from the database
  const q = "SELECT * FROM users WHERE username = ?";

  // Execute the query with the provided username in the request body
  db.query(q, [req.body.username], (err, data) => {
    // If there's an error, log it and send a 500 (Internal Server Error) response
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    // If no user is found, send a 404 (Not Found) response
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(
      req.body.password,
      data[0].password,
      (err, checkPassword) => {
        // If there's an error, log it and send a 500 (Internal Server Error) response
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred" });
        }

        // If the passwords don't match, send a 400 (Bad Request) response
        if (!checkPassword) {
          return res.status(400).json({ error: "Wrong password or username!" });
        }

        // If the passwords match, create a JWT token with the user's ID as the payload
        const token = jwt.sign({ id: data[0].id }, jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn,
        });

        // Remove the password from the user's data before sending it back in the response
        const { password, ...others } = data[0];

        // Set a cookie with the JWT token, send a 200 (OK) response with the user's data
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: true, // Set secure to true if using HTTPS
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
          })
          .status(200)
          .json(others);
      },
    );
  });
};
