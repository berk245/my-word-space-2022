const request = require("supertest");
const app = require("../app.js");


describe("Login", () => {
  test("should return an error when username or password is not in the request", async () => {
    let bodyData = [
      {
        username: "test-username",
        password: "",
      },
      {
        username: "",
        password: "test- password",
      },
      {},
    ];
    for (const body of bodyData) {
      const response = await request(app).post("/login").send(body);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    }
  });
  test("should return an error if username cannot be found in database or if password does not match", async () => {
    let bodyData = [
      {
        username: "non-existent-user",
        password: "testPass",
      },
      {
        username: "test-user",
        password: "wrongPass",
      },
    ];

    for (body of bodyData) {
      const response = await request(app).post("/login").send(body);
      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual({
        error: "Username password combination does not exist.",
      });
    }
  });
 
  test("should return token after a succesful login", async () => {
    const response = await request(app).post("/login").send({
      username: 'front-test',
      password: '1234'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined()
  });
});
