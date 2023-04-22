import { db, jwtConfig } from "../../../dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = (req, res) => {
  // Define a query to retrieve the user's information from the database
  const userQuery = "SELECT * FROM users WHERE username = ?";

  // Execute the query with the provided username in the request body
  db.query(userQuery, [req.body.username], (err, userData) => {
    // If there's an error, log it and send a 500 (Internal Server Error) response
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    // If no user is found, send a 404 (Not Found) response
    if (userData.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(
      req.body.password,
      userData[0].password,
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

        // Define a query to retrieve the user's cameras
        const cameraQuery = "SELECT * FROM camera WHERE user_id = ?";

        // Execute the query with the user's ID
        db.query(cameraQuery, [userData[0].id], (err, cameraData) => {
          // If there's an error, log it and send a 500 (Internal Server Error) response
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred" });
          }

          // Define a query to retrieve the camera_information for the user's cameras
          const cameraInfoQuery =
            "SELECT * FROM camera_information WHERE camera_id IN (?)";

          // Get the camera IDs from the cameraData
          const cameraIds = cameraData.map((camera) => camera.id);

          // Execute the query with the camera IDs
          db.query(cameraInfoQuery, [cameraIds], (err, cameraInfoData) => {
            // If there's an error, log it and send a 500 (Internal Server Error) response
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "An error occurred" });
            }

            // If the passwords match, create a JWT token with the user's ID as the payload
            const token = jwt.sign({ id: userData[0].id }, jwtConfig.secret, {
              expiresIn: jwtConfig.expiresIn,
            });

            // Prepare the response data
            const responseData = {
              user: userData[0],
              cameras: cameraData,
              camera_information: cameraInfoData,
            };

            // Remove the password from the user's data before sending it back in the response
            const { password, ...others } = responseData.user;
            responseData.user = others;

            // Set a cookie with the JWT token, send a 200 (OK) response with the response data
            res
              .cookie("accessToken", token, {
                httpOnly: true,
                secure: true, // Set secure to true if using HTTPS
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
              })
              .status(200)
              .json(responseData);
          });
        });
      },
    );
  });
};
