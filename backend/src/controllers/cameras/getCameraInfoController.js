// Import necessary modules and packages
import { db, jwtConfig } from "../../../dbConnect.js";
import jwt from "jsonwebtoken";

// Define the getCameraInfo function to handle fetching user's camera information
export const getCameraInfo = (req, res) => {
  // Verify the JWT token from the cookie
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    // Define a query to retrieve the camera information associated with the user
    const q = `
      SELECT ci.* FROM camera_information ci
      JOIN camera c ON ci.camera_id = c.id
      WHERE c.user_id = ?`;

    // Execute the query with the user's ID from the JWT payload
    db.query(q, [decoded.id], (err, data) => {
      // If there's an error, log it and send a 500 (Internal Server Error) response
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }

      // If the query is successful, send a 200 (OK) response with the camera information data
      res.status(200).json({ camera_information: data });
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
