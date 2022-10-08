const request = require("supertest");
const app = require("../app.js");

let bodyData = [
  {
    username: "test-username",
    password: "test- password",
    email: "",
  },
  {
    username: "test-username",
    email: "some@email.com",
  },
  {
    password: "test-username",
    email: "some@email.com",
  },
  {
    username: "test-username",
    email: "",
  },
];

describe("Signup route", () => {
  test("should return an error when required fields are missing", async () => {
    for (const body of bodyData) {
      const response = await request(app).post("/signup").send(body);
      expect(response.statusCode).toBe(500);
    }
    // expect(response.body).toEqual({ error: "Missing required fields" });
  });
  test("should return an error if the username is already taken", async () => {});
  
  test("should return an error if the email address is already in use", async () => {});
  test("should return the userToken a succesful login", async () => {
    const response = await request(app).post("/signup").send({
      username: "Successful test",
      password: "testPass",
      email: "email@mail.com",
    });
    expect(response.statusCode).toBe(200)
    expect(response.body.userToken).toBeDefined()
  });
});
