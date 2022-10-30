const request = require("supertest");
const makeApp = require("../app.js");
const database = require("../config/database");

const app = makeApp({
  ...database,
});

describe("Words route", () => {
  describe("Should return errors if", () => {
    test("get-all words request is missing a user identifier", async () => {
      const response = await request(app)
        .get("/word/get-all")
        .send({ userId: "" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    });

    // test("add-new request is missing a user identifier or word parameters", async () => {
    //   let bodyData = [
    //     {
    //       userId: "",
    //       wordType: 'noun',
    //       wordOriginal: "test-word",
    //       wordTranslation: "",
    //     },
    //     {
    //       userId: "test-username",
    //       wordType: "",
    //       wordOriginal: "",
    //       wordTranslation: "",
    //     },
    //     {},
    //   ];
    //   for (const body in bodyData) {
    //     const response = await request(app).post("/word/add").send(body);
    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toEqual({ error: "Missing required fields" });
    //   }
    // });
    // test("user id cannot be found when adding a new word", async () => {
    //   const response = await request(app)
    //     .post("/notebook/add")
    //     .send({
    //       userId: "non-existent-username",
    //       wordType: 1,
    //       wordOriginal: "",
    //       wordTranslation: "",
    //     });
    //   expect(response.statusCode).toBe(400);
    //   expect(response.body).toEqual({ error: "User cannot be found" });
    // });
    // test("notebook id cannot be found when adding a new word", async () => {
    //   const response = await request(app)
    //     .post("/notebook/add")
    //     .send({
    //       userId: "test-username",
    //       wordType: "",
    //       wordOriginal: "",
    //       wordTranslation: "",
    //     });
    //   expect(response.statusCode).toBe(400);
    //   expect(response.body).toEqual({ error: "User cannot be found" });
    // });
    // test("update-word request is missing a word id or update fields for words", async () => {
    //   let bodyData = [
    //     {
    //       userId: "test-username",
    //       wordType: "",
    //       wordOriginal: "",
    //       wordTranslation: "",
    //       userId: "",
    //     },
    //     {},
    //   ];
    //   for (const body in bodyData) {
    //     const response = await request(app).post("/notebook/update").send(body);
    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toEqual({ error: "Missing required fields" });
    //   }
    // });
    // test("update-word request is made with a word id that does not exist", async () => {
    //   const response = await request(app).post("/notebook/update").send({
    //     userId: 1,
    //     newNotebookName: "update-name",
    //     notebookId: "n/a",
    //   });
    //   expect(response.statusCode).toBe(400);
    //   expect(response.body).toEqual({ error: "Could not find the notebook" });
    // });
    // test("delete-word request is missing a word or user identifier", async () => {
    //   let bodyData = [
    //     {
    //       userId: 1,
    //       wordId: "",
    //     },
    //     {
    //       userId: "",
    //       wordId: 3,
    //     },
    //     {},
    //   ];
    //   for (const body in bodyData) {
    //     const response = await request(app)
    //       .delete("/word/delete")
    //       .send(body);
    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toEqual({ error: "Missing required fields" });
    //   }
    // });
    // test("delete-word request is made with a word id that does not exist", async () => {
    //   const response = await request(app).delete("/word/delete").send({
    //     userId: 1,
    //     wordId: "n/a",
    //   });
    //   expect(response.statusCode).toBe(400);
    //   expect(response.body).toEqual({ error: "Could not find the word" });
    // });
  });
  test("should return all words of a specific user", async () => {
    const response = await request(app)
      .get("/word/get-all")
      .send({ userId: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.words).toBeDefined();
  });
});
