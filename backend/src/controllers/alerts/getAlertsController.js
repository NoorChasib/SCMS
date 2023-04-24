import { db, jwtConfig } from "../../../dbConnect.js";
import jwt from "jsonwebtoken";

export const getAllAlerts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    const q = "SELECT * FROM alerts WHERE user_id = ?";

    db.query(q, [decoded.id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }

      res.status(200).json({ alerts: data });
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const getAlertsByCamera = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const camera_id = req.params.camera_id;

    const q = "SELECT * FROM alerts WHERE user_id = ? AND camera_id = ?";

    db.query(q, [decoded.id, camera_id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }

      res.status(200).json({ alerts: data });
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
