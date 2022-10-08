const request = require("supertest");
const makeApp = require("../app.js");
const database = require("../config/database");

const app = makeApp({
  ...database,
  //Some Mocks Here
});

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
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Missing required fields" });
    }
  });
  test("should return an error if username cannot be found in database", async () => {
    let bodyData = [
      {
        username: 'non-existent-user',
        password: 'testPass'
      },
      {
        username: 'test-user',
        password: 'wrongPass'
      }
    ]

    for(body of bodyData){
      const response = await request(app).post("/login").send(body);
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Username password combination does not exist." });
    }
   
  });
  // test("should return an error if username cannot be found in database", async () => {
  //   const response = await request(app).post("/login").send({
  //     username: 'test-user',
  //     password: 'testPass'
  //   });
  //   expect(response.statusCode).toBe(500);
  //   expect(response.body).toEqual({ error: "Missing required fields" });
  // });
  // test("should return an error if password does not match", async () => {});
  // test("should return token after a succesful login", async () => {});
});
