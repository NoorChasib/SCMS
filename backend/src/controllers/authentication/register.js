import { db } from "../../../connect.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

export const validationRules = [
  check("name").notEmpty().withMessage("Name is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const username = req.body.username;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    if (data.length) {
      return res.status(409).json({ error: "This user already exists" });
    }

    // Hash the password
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

        const values = [
          req.body.name,
          username,
          req.body.email,
          hashedPassword,
        ];

        const q =
          "INSERT INTO users (`name`, `username`, `email`, `password` ) VALUES (?)";
        db.query(q, [values], (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred" });
          }
          return res.status(200).json({ message: "User has been created" });
        });
      });
    });
  });
};
