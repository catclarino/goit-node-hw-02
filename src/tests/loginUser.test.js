import request from "supertest";
import { app } from "../../app.js";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

describe("Test @POST /api/users/login", () => {
  const signInData = {
    email: "cat@example.com",
    password: "examplepassword",
  };

  const mockUserId = "mockUserId";
  let mockUser;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(signInData.password, 10);
    mockUser = {
      _id: mockUserId,
      email: signInData.email,
      password: hashedPassword,
      subscription: "starter",
    };

    jest.spyOn(User, "findOne").mockImplementation(({ email }) => {
      if (email === signInData.email) {
        return Promise.resolve(mockUser);
      }
      return Promise.resolve(null);
    });

    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation((password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
      });

    jest.spyOn(jwt, "sign").mockImplementation(() => "mockJwtToken");

    jest.spyOn(User, "findByIdAndUpdate").mockImplementation((id, update) => {
      if (id === mockUserId) {
        return Promise.resolve({ ...mockUser, ...update });
      }
      return Promise.resolve(null);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Test login with correct data.", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(signInData);

    console.log("Login Data:", signInData);
    console.log("Response status code:", response.status);
    console.log("Response body:", response.body);
    console.log("Response body USER:", response.body.user);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token", "mockJwtToken");

    const { user } = response.body;

    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("subscription");

    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
