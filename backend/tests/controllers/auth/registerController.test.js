// Import required modules
import { Register } from "../../../src/controllers/auth/registerController";
import { db } from "../../../dbConnect";
import bcrypt from "bcryptjs";
// Start a Jest test suite for the Register function
describe("Register function", () => {
  // Reset all mocks before each test case
  beforeEach(() => {
    jest.resetAllMocks();
  });
  // Start a test case for when a new user is successfully created
  test("should create a new user and send a success message", async () => {
    // Mock request body
    const req = {
      body: {
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        password: "123456",
      },
    };
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock database query results
    const queryResult = [];
    jest.spyOn(db, "query").mockImplementation((q, values, cb) => {
      cb(null, queryResult);
    });

    // Mock bcrypt functions
    jest.spyOn(bcrypt, "genSalt").mockImplementation((_, cb) => {
      cb(null, "salt");
    });
    jest.spyOn(bcrypt, "hash").mockImplementation((_, __, cb) => {
      cb(null, "hashedPassword");
    });

    // Call the Register function with the mocked request and response objects
    await Register(req, res);

    // Assert that db.query has been called with the expected query and values
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE username = ?",
      ["johndoe"],
      expect.any(Function),
    );
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO users (`name`, `username`, `email`, `password` ) VALUES (?)",
      [["John Doe", "johndoe", "johndoe@example.com", "hashedPassword"]],
      expect.any(Function),
    );

    // Assert that bcrypt.genSalt and bcrypt.hash have been called with the expected arguments
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10, expect.any(Function));
    expect(bcrypt.hash).toHaveBeenCalledWith(
      "123456",
      "salt",
      expect.any(Function),
    );

    // Assert that status has been called with 200 and json has been called with the expected response body
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User has been created" });
  });
});
