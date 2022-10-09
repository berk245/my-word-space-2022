const request = require("supertest");
const createApp = require("../app.js");
const database = require("../config/database");
// const getUserByUsername = database.getUserByEmail;
// const getUserByEmail = jest.fn();
const saveUserToDatabase = jest.fn();
const app = createApp(
  { ...database, saveUserToDatabase: saveUserToDatabase }
);

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
      expect(response.statusCode).toBe(400);
    }
  });
  test("should return an error if the username is already taken", async () => {
    const response = await request(app).post("/signup").send({
      username: "test-user",
      password: "test- password",
      email: "asd",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.existingUsernameError).toBeDefined();
  });

  test("should return an error if the email address is already in use", async () => {
    const response = await request(app).post("/signup").send({
      username: "test-username",
      email: "test@test.com",
      password: "pass",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.existingEmailError).toBeDefined();
  });
    test("should return a success message after a succesful signup", async () => {
        saveUserToDatabase.mockReturnValueOnce({statusCode: 200, body:{ signupSuccess: true}})
        const response = await request(app).post("/signup").send({
        username: "UniqueLongNameForTheTest",
        password: "password",
        email: "anotheruniquevalueonthewall",
      });
      expect(saveUserToDatabase.mock.calls.length).toBe(1)
      expect(saveUserToDatabase.mock.calls[0][0]['email']).toBeDefined()
      expect(saveUserToDatabase.mock.calls[0][0]['password']).toBeDefined()
      expect(saveUserToDatabase.mock.calls[0][0]['username']).toBeDefined()
    
    });

});
