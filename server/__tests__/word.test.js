const request = require("supertest");
const app = require("../app.js");

describe("Words route", () => {
  describe("Should return errors if", () => {
    test("add-new request is missing a user identifier or word parameters", async () => {
      let bodyData = [
        {
          notebookId: "",
          wordType: 'noun',
          wordOriginal: "test-word",
          wordTranslation: "",
        },
        {
          notebookId: '',
          wordType: "",
          wordOriginal: "",
          wordTranslation: "",
        },
      ];
      for (const body of bodyData) {
        const response = await request(app).post("/word/add").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("notebook id cannot be found when adding a new word", async () => {
      const response = await request(app)
        .post("/word/add")
        .send({
          notebookId: '99991',
          wordType: "1",
          wordOriginal: "original",
          wordTranslation: "translation",
        });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
    test("edit-word request is missing a word id or update fields for words", async () => {
      let bodyData = [
        {
          notebookId: '99991',
          wordType: "1",
          wordOriginal: "original",
          wordTranslation: "translation",
        },
        {
          notebookId: '99991',
          wordType: "1",
          wordOriginal: "",
          wordTranslation: "translation",
        },
        {},
      ];
      for (const body of bodyData) {
        const response = await request(app).post("/word/edit").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("edit-word request is made with a word id that does not exist", async () => {
      const response = await request(app).post("/word/edit").send({
        wordId: 1231,
        notebookId: 15151,
        wordOriginal: 'test',
        wordTranslation: 'test',
        wordType: 'noun'
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the word" });
    });
    test("delete-word request is missing fields", async () => {
      let bodyData = [
        {
          wordId: "",
          notebookId: ''
        },
        {
          wordId: "1",
          notebookId: ''
        },
        {},
      ];
      for (const body of bodyData) {
        const response = await request(app)
          .delete("/word/delete")
          .send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("delete-word request is made with a word id that does not exist", async () => {
      const response = await request(app).delete("/word/delete").send({
          wordId: 309,
          notebookId: 1555145
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the word" });
    });
  });
  test("should return all words of a specific user", async () => {
    const response = await request(app)
      .get("/word/get-all")
    expect(response.statusCode).toBe(200);
    expect(response.body.words).toBeDefined();
  });
});
