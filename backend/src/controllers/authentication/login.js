import { db, jwtConfig } from "../../../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    bcrypt.compare(
      req.body.password,
      data[0].password,
      (err, checkPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred" });
        }

        if (!checkPassword) {
          return res.status(400).json({ error: "Wrong password or username!" });
        }

        const token = jwt.sign({ id: data[0].id }, jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn,
        });

        const { password, ...others } = data[0];

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
