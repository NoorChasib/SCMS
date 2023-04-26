// Import necessary modules and packages
import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config({ path: "../backend/.env" });

// Create a MySQL database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true,
});

// Define JWT configuration options using environment variables
const jwtConfig = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRATION,
};

// Define server port configuration options using environment variables
const serverConfig = {
  host: process.env.DB_HOST,
  backendPort: process.env.BACKEND_PORT,
  frontendPort: process.env.FRONTEND_PORT,
};

// Export the db and jwtConfig objects for use in other parts of the application
export { db, jwtConfig, serverConfig };
