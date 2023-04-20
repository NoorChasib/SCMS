import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config({ path: "../backend/.env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const jwtConfig = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRATION,
};

export { db, jwtConfig };
