const request = require("supertest");
const app = require("../app.js");
const saveUserToDatabase = require('../helpers/saveUserToDatabase')
jest.mock('../helpers/saveUserToDatabase')

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

const weakPasswordAttempts = [
  {
    username: "veryUniqueUsernameForTesting",
    password: "short",
    email: "123some@email.com",
  },
  {
    username: "veryUniqueUsernameForTesting",
    password: "longbutwithoutNumbers",
    email: "123some@email.com",
  },
  {
    username: "veryUniqueUsernameForTesting",
    password: "longbutwithoutuppercase12345",
    email: "123some@email.com",
  },
  {
    username: "veryUniqueUsernameForTesting",
    password: "LONGBUTWITHUTLOWERCASE1234",
    email: "123some@email.com",
  },
  {
    username: "veryUniqueUsernameForTesting",
    password: "LONG BUT with whitespace 1234",
    email: "123some@email.com",
  },
]

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
  test("should return an error if password provided does not match security requirements", async () => {
    
    weakPasswordAttempts.forEach(async (signupData) => {
      const response = await request(app).post("/signup").send(signupData);
      expect(response.statusCode).toBe(400);
      expect(response.body.weakPasswordError).toBeDefined();
    })
  });
    test("should return a success message after a succesful signup", async () => {
      jest.resetAllMocks()  
      saveUserToDatabase.mockResolvedValueOnce({statusCode: 200, body:{ signupSuccess: true}})
        
      const response = await request(app).post("/signup").send({
        username: "UniqueLongNameForTheTest",
        password: "passworD12",
        email: "unique@email.co.uk",
      });

      expect(saveUserToDatabase.mock.calls.length).toBe(1)
      expect(saveUserToDatabase.mock.calls[0][0]['email']).toBeDefined()
      expect(response.statusCode).toBe(200)

    });
    
});
