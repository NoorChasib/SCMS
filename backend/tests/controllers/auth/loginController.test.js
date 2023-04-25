// Import required modules
import { Login } from "../../../src/controllers/auth/loginController";
import { db } from "../../../dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock the necessary dependencies
jest.mock("../../../dbConnect.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

// Define helper functions for creating mock request and response objects
const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.cookie = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Start a Jest test suite for the Login function
describe("Login function", () => {
  // Run the clearAllMocks function before each test case
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Start a test case for when the user is not found
  it("should send a 404 response when the user is not found", () => {
    // Create a mock request object with an unknown username and password
    const req = mockRequest({ username: "unknownuser", password: "password" });
    // Create a mock response object
    const res = mockResponse();
    // Mock the db query function to return an empty array
    db.query.mockImplementation((q, params, cb) => cb(null, []));
    // Call the Login function with the mock request and response objects
    Login(req, res);
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found!" });
  });

  // Start a test case for when the password is incorrect
  it("should send a 400 response when the password is incorrect", () => {
    // Create a mock request object with a known username and incorrect password
    const req = mockRequest({ username: "johndoe", password: "password123" });
    // Create a mock response object
    const res = mockResponse();
    // Mock the bcrypt compare function to return false
    const mockCompare = jest.fn().mockImplementation((pw, hashedPw, cb) => {
      cb(null, false);
    });
    // Mock the db query function to return an array with a hashed password
    db.query.mockImplementation((q, params, cb) =>
      cb(null, [{ password: "hashedpassword" }]),
    );
    // Mock the bcrypt compare function
    bcrypt.compare.mockImplementation(mockCompare);
    // Call the Login function with the mock request and response objects
    Login(req, res);
    // Expect that the bcrypt compare function and response status and JSON functions were called with the correct parameters
    expect(mockCompare).toHaveBeenCalledWith(
      req.body.password,
      "hashedpassword",
      expect.any(Function),
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Wrong password or username!",
    });
  });

  // Start a test case for when there's a database error
  it("should send a 500 response when there's a database error", () => {
    // Create a mock request object with a known username and password
    const req = mockRequest({ username: "johndoe", password: "password123" });
    // Create a mock response object
    const res = mockResponse();
    // Mock the db query function to return an error
    db.query.mockImplementation((q, params, cb) => cb(new Error("DB error")));
    // Call the Login function with the mock request and response objects
    Login(req, res);
    // Expect that the response status and JSON functions were called with the correct parameters
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "An error occurred" });
  });

  // Start a test case for when login is successful
  it("should send a 200 response with user data when login is successful", () => {
    // Create a mock request object with a known username and password
    const req = mockRequest({ username: "johndoe", password: "password123" });
    // Create a mock response object
    const res = mockResponse();
    // Mock the bcrypt compare function to return true
    const mockCompare = jest.fn().mockImplementation((pw, hashedPw, cb) => {
      cb(null, true);
    });
    // Mock the db query function to return an array with user data, including a hashed password
    db.query.mockImplementation((q, params, cb) =>
      cb(null, [{ id: 1, username: "johndoe", password: "hashedpassword" }]),
    );
    // Mock the bcrypt compare function, JWT sign function, and response cookie function
    bcrypt.compare.mockImplementation(mockCompare);
    jwt.sign.mockReturnValue("token123");
    // Call the Login function with the mock request and response objects
    Login(req, res);
    // Expect that the bcrypt compare function, JWT sign function, and response cookie and status and JSON functions were called with the correct parameters
    expect(mockCompare).toHaveBeenCalledWith(
      req.body.password,
      "hashedpassword",
      expect.any(Function),
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1 },
      expect.any(String),
      expect.objectContaining({
        expiresIn: expect.any(String),
      }),
    );
    expect(res.cookie).toHaveBeenCalledWith("accessToken", "token123", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, username: "johndoe" });
  });
});
