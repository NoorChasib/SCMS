import { Login } from "../../../src/controllers/auth/loginController";
import { db } from "../../../dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../../../dbConnect.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

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

describe("Login function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send a 404 response when the user is not found", () => {
    const req = mockRequest({ username: "unknownuser", password: "password" });
    const res = mockResponse();
    db.query.mockImplementation((q, params, cb) => cb(null, []));

    Login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found!" });
  });

  it("should send a 400 response when the password is incorrect", () => {
    const req = mockRequest({ username: "johndoe", password: "password123" });
    const res = mockResponse();
    const mockCompare = jest.fn().mockImplementation((pw, hashedPw, cb) => {
      cb(null, false);
    });
    db.query.mockImplementation((q, params, cb) =>
      cb(null, [{ password: "hashedpassword" }]),
    );
    bcrypt.compare.mockImplementation(mockCompare);

    Login(req, res);

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

  it("should send a 500 response when there's a database error", () => {
    const req = mockRequest({ username: "johndoe", password: "password123" });
    const res = mockResponse();
    db.query.mockImplementation((q, params, cb) => cb(new Error("DB error")));

    Login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "An error occurred" });
  });

  it("should send a 200 response with user data when login is successful", () => {
    const req = mockRequest({ username: "johndoe", password: "password123" });
    const res = mockResponse();
    const mockCompare = jest.fn().mockImplementation((pw, hashedPw, cb) => {
      cb(null, true);
    });
    db.query.mockImplementation((q, params, cb) =>
      cb(null, [{ id: 1, username: "johndoe", password: "hashedpassword" }]),
    );
    bcrypt.compare.mockImplementation(mockCompare);
    jwt.sign.mockReturnValue("token123");

    Login(req, res);

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
