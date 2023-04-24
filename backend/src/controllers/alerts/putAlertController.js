import { db, jwtConfig } from "../../../dbConnect.js";
import jwt from "jsonwebtoken";

export const putAlert = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const camera_id = req.params.camera_id;
    const { alert_id, alert_type, start_time, end_time } = req.body;

    const q =
      "UPDATE alerts SET camera_id = ?, alert_type = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?";

    db.query(
      q,
      [camera_id, alert_type, start_time, end_time, alert_id, decoded.id],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred" });
        }

        if (data.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Alert not found or not authorized" });
        }

        res.status(200).json({ message: "Alert updated" });
      },
    );
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
