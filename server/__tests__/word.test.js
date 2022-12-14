const request = require("supertest");
const app = require("../app.js");

describe("Words route", () => {
  describe("Should return errors if", () => {
    test("add-new request is missing a user identifier or word parameters", async () => {
      let bodyData = [
        {
          userId: "",
          notebookId: "",
          wordType: 'noun',
          wordOriginal: "test-word",
          wordTranslation: "",
        },
        {
          userId: "test-username",
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
          userId: "1",  
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
          userId: "1",  
          notebookId: '99991',
          wordType: "1",
          wordOriginal: "original",
          wordTranslation: "translation",
        },
        {
          userId: "1",  
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
        userId: 1, 
        wordId: 1,
        notebookId: 151,
        wordOriginal: 'test',
        wordTranslation: 'test',
        wordType: 'noun'
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the word" });
    });
    test("delete-word request is missing fields or user identifier", async () => {
      let bodyData = [
        {
          userId: 1,
          wordId: "",
          notebookId: ''
        },
        {
          userId: 1,
          wordId: "1",
          notebookId: ''
        },
        {
          userId: '',
          wordId: 1,
          notebookId: ''
        },
        {
          userId: 1,
          wordId: 2,
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
        userId: 1,
          wordId: 309,
          notebookId: 1555
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the word" });
    });
  });
  test("should return all words of a specific user", async () => {
    const response = await request(app)
      .get("/word/get-all/1")
    expect(response.statusCode).toBe(200);
    expect(response.body.words).toBeDefined();
  });
});
