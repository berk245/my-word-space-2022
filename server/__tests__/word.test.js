const request = require("supertest");
const makeApp = require("../app.js");
const database = require("../config/database");
// const addNewWord = jest.fn();
const app = makeApp({
  ...database,
  // addNewWord: addNewWord
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
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
    test("update-word request is missing a word id or update fields for words", async () => {
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
        const response = await request(app).post("/word/update").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("update-word request is made with a word id that does not exist", async () => {
      const response = await request(app).post("/word/update").send({
        userId: 1, 
        wordId: 1,
        notebookId: 151,
        wordOriginal: 'test',
        wordTranslation: 'test',
        wordType: 'noun'
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the word" });
    });
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
    //   for (const body of bodyData) {
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
  // test('should successfully call add new word function', async()=>{
  //   addNewWord.mockReturnValueOnce({
  //     statusCode: 200,
  //     body: { addWordSuccess: true },
  //   });
  //   const response = await request(app).post("/word/add").send({
  //     userId: "1",
  //     notebookId: "1",
  //     wordType: 'noun',
  //     wordOriginal: "test-word",
  //     wordTranslation: "test-translation",
  //   },);

  //   expect(addNewWord.mock.calls.length).toBe(1);
  //   expect(addNewWord.mock.calls[0][0]["userId"]).toBeDefined();
  //   expect(addNewWord.mock.calls[0][0]["notebookId"]).toBeDefined();
  //   expect(addNewWord.mock.calls[0][0]["wordType"]).toBeDefined();
  //   expect(addNewWord.mock.calls[0][0]["wordOriginal"]).toBeDefined();
  //   expect(addNewWord.mock.calls[0][0]["wordTranslation"]).toBeDefined();
    
  // })
});
