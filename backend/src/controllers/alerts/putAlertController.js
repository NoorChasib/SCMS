// Import necessary modules and packages
import { db, jwtConfig } from "../../../dbConnect.js";
import jwt from "jsonwebtoken";

// Update alert details in the database
export const putAlert = (req, res) => {
  // Get the access token from cookies
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, jwtConfig.secret);
    // Get the camera ID and alert details from the request body
    const camera_id = req.params.camera_id;
    const { alert_id, alert_type, start_time, end_time } = req.body;
    // Define the SQL query to update the alert details
    const q =
      "UPDATE alerts SET camera_id = ?, alert_type = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?";

    // Execute the query with the given parameters
    db.query(
      q,
      [camera_id, alert_type, start_time, end_time, alert_id, decoded.id],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred" });
        }

        // Check if the update was successful
        if (data.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Alert not found or not authorized" });
        }

        // Return success message if the update was successful
        res.status(200).json({ message: "Alert updated" });
      },
    );
  } catch (err) {
    // Return error if the token is invalid or expired
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
