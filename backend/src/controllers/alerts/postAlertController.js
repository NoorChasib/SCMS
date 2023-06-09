// Import necessary modules and packages
import { db, jwtConfig } from "../../../dbConnect.js";
import jwt from "jsonwebtoken";

// Function to create a new alert for a specific user and camera
export const postAlert = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const camera_id = req.params.camera_id;
    const { alert_type, end_time } = req.body;

    // SQL query to insert a new alert into the database for a user and camera
    const q =
      "INSERT INTO alerts (user_id, camera_id, alert_type, end_time) VALUES (?, ?, ?, ?)";

    db.query(q, [decoded.id, camera_id, alert_type, end_time], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }

      res
        .status(201)
        .json({ message: "Alert created", alert_id: data.insertId });
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
