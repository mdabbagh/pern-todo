import request from "supertest";
import makeApp from "../app.js";
import { jest } from "@jest/globals";

const createUser = jest.fn();
const getUserByEmail = jest.fn();
const userModel = jest.fn();
const app = makeApp({ userModel });

describe("Test auth routes", function () {
  beforeEach(() => {
    createUser.mockReset();
    getUserByEmail.mockReset();
    userModel.mockReset();
  });

  test("unsuccessful register with invalid email", async () => {
    const req = {
      firstname: "first",
      lastname: "last",
      email: "email",
      password: "password",
    };
    const res = await request(app).post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("email format");
  });

  test("unsuccessful register with missing passowrd", async () => {
    const req = {
      firstname: "first",
      lastname: "last",
      email: "email@email.com",
      password: "",
    };
    const res = await request(app).post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("empty");
  });

  test("unsuccessful register with missing email", async () => {
    const req = {
      firstname: "first",
      lastname: "last",
      email: "",
      password: "asdfasdf",
    };
    const res = await request(app).post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("empty");
  });

  test("successful register", async () => {
    const req = {
      firstname: "first",
      lastname: "last",
      email: "test@test.com",
      password: "asdfasdf",
    };
    userModel.getUserByEmail.mockResolvedValue();
    const res = await request(app).post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("BLAH");
  });
});
