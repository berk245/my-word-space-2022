const request = require("supertest");
const createApp = require("../app.js");
const app = createApp({
    getUserByUsername: jest.fn(),
    getUserByEmail: jest.fn(),
    saveUserToDatabase: jest.fn()
})

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
  });
//   test("should return an error if the username is already taken", async () => {
//     const response = await request(app).post("/signup").send({
//       username: "test-user",
//     });
//     expect(response.statusCode).toBe(500);
//     expect(response.body.existingUsernameError).toBeDefined();
//   });

//   test("should return an error if the email address is already in use", async () => {
//     const response = await request(app).post("/signup").send({
//       email: "test@test.com",
//     });
//     expect(response.statusCode).toBe(500);
//     expect(response.body.existingEmailError).toBeDefined();
//   });
//   test("should return a success message after a succesful signup", async () => {
//     const response = await request(app).post("/signup").send({
//       username: "Successfultests",
//       password: "jestPass",
//       email: "jest@jest.com",
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.signupSuccess).toBeTruthy();
//   });
});
