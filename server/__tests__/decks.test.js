const request = require("supertest");
const makeApp = require("../app.js");
const database = require("../config/database");

const app = makeApp({
  ...database,
  //Some Mocks Here
});

describe("Decks route", () => {
  describe("Should return errors if", () => {
    test("get-all-decks request is missing a user identifier", async () => {
      const response = await request(app)
        .get("/decks/get-all")
        .send({ userId: "" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    });
    test("add-new-deck request is missing a user identifier or a deck name", async () => {
      let bodyData = [
        {
          userId: "test-username",
          deckName: "",
        },
        {
          userId: "",
          deckName: "test-password",
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).post("/decks/add").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("edit-deck request is missing a user id or a deck identifier or a new name for the deck", async () => {
      let bodyData = [
        {
          userId: 1,
          newDeckName: "update-name",
          deckId: "",
        },
        {
          userId: 1,
          newDeckName: "",
          deckId: 3,
        },
        {
          userId: "",
          newDeckName: "update-name",
          deckId: 3,
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).post("/decks/edit").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });

    test("edit-deck request is made with a deck id that does not exist", async () => {
      const response = await request(app).post("/decks/edit").send({
        userId: 1,
        newDeckName: "update-name",
        deckId: "n/a",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the deck" });
    });

    test("delete-deck request is missing a deck or user identifier", async () => {
      let bodyData = [
        {
          userId: 1,
          deckId: "",
        },
        {
          userId: "",
          deckId: 3,
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).delete("/decks/delete").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("delete-deck request is made with a deck id that does not exist", async () => {
      const response = await request(app).delete("/decks/delete").send({
        userId: 1,
        deckId: "n/a",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the deck" });
    });
  });
  test("should return all decks of a specific user", async () => {
    const response = await request(app)
      .get("/decks/get-all")
      .send({ userId: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.decks).toBeDefined();
  });

  test("should succesfuly update the name of an existing deck", async () => {
    const response = await request(app).post("/decks/add").send({
      userId: 3,
      deckId: 1,
      newDeckName: "New name",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Update succesful" });
  });
  test("should succesfuly delete an existing deck", async () => {
    const response = await request(app).delete("/decks/delete").send({
      userId: 3,
      deckId: 2,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Delete succesful" });
  });
});