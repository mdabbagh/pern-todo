import request from "supertest";
import makeApp from "../app.js";
import { jest } from "@jest/globals";
import userModel from "../models/user.model.js";
import * as authRoutes from "../routes/auth.routes.js";

const query = jest.fn();
/*const mockedVal = {
  command: "INSERT",
  rowCount: 1,
  oid: 0,
  rows: [
    {
      user_id: 3,
      firstname: "test first",
      lastname: "test last",
      email: "testfirst1@testlast.com",
    },
  ],
};
const localUserModel = jest
  .spyOn(genUserModel, "createUser")
  .mockReturnValue(mockedVal);
const app = makeApp({ getUserByEmail, query, createUser, localUserModel });*/

const app = makeApp({ query });

describe("Test auth routes", function () {
  beforeEach(() => {});

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
    //query.mockResolvedValue({ rows: [] });
    jest.mock("../models/user.model.js", () => ({
      getUserByEmail: () =>
        Promise.resolve({
          rows: [{}],
        }),
    }));
    const res = await request(app).post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("BLAH");
  });
});
