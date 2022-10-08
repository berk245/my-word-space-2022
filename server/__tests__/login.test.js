const request = require("supertest");
const app = require("../app.js");

describe("Login", () => {
  test("should return an error when username or password is not in the request", async () => {
    let bodyData = [
      {
        username: "test-username",
      },
      {
        password: "test- password",
      },
      {},
    ];
    for (const body of bodyData) {
      const response = await request(app).post("/login").send(body);
      expect(response.statusCode).toBe(500);
    }
    // expect(response.body).toEqual({ error: "Missing required fields" });
  });
  test("should return an error if username or password cannot be found in database", async () => {});
  test("should return the user id/token after a succesful login", async () => {});
});
