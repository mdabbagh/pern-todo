import supertest from "supertest";
import app from "../app";
const requestWithSupertest = supertest(app);

describe("Test auth routes", function () {
  test("unsuccessful register with invalid email", async () => {
    const req = {
      firstname: "first",
      lastname: "last",
      email: "email",
      password: "password",
    };
    const res = await requestWithSupertest.post("/auth/register").send(req);
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
    const res = await requestWithSupertest.post("/auth/register").send(req);
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
    const res = await requestWithSupertest.post("/auth/register").send(req);
    expect(res.status).toBe(400);
    expect(res.body).toContain("empty");
  });
});
