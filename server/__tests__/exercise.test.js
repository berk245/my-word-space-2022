const request = require("supertest");
const app = require("../app.js");

const getExerciseQuestions = require("../helpers/getExerciseQuestions");
const isExerciseComplete = require("../helpers/isExerciseComplete");
const updateExerciseAndWordStats = require("../helpers/updateExerciseAndWordStats");
const createNewExercise = require("../helpers/createNewExercise");

jest.mock("../helpers/getExerciseQuestions");
jest.mock("../helpers/isExerciseComplete");
jest.mock("../helpers/createNewExercise");
jest.mock("../helpers/updateExerciseAndWordStats");

describe("Exercise route", () => {
  describe("should return errors when", () => {
    test("get exercise request is missing a user or exercise id", async () => {
      const response = await request(app).get("/exercise/get");
      expect(response.statusCode).toBe(404);
    });

    test("begin-exercise request is missing word amount", async () => {
      let bodyData = [
        {
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: "",
          }
        },
        {exerciseParameters:{}},
      ];
      for (const body of bodyData) {
        const response = await request(app).post("/exercise/begin").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
          error: "Missing or invalid required fields",
        });
      }
    });
    test("begin exercise request has more words than the user has", async () => {
      getExerciseQuestions.mockResolvedValueOnce({ error: "Not enough words" });
      const response = await request(app)
        .post("/exercise/begin")
        .send({
          exerciseParameters: {
            wordTypes: [],
            notebooks: [],
            amount: 15000,
          },
        });
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toEqual("Not enough words");
    });
    test("begin exercise request fails to create a new exercise in the db", async () => {
      jest.resetAllMocks();
      getExerciseQuestions.mockResolvedValueOnce([1, 2, 3]);
      createNewExercise.mockResolvedValueOnce(false);
      const response = await request(app)
        .post("/exercise/begin")
        .send({
          exerciseParameters: {
            wordTypes: [],
            notebooks: [],
            amount: 10,
          },
        });
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toEqual(
        "Could not create exercise. Please try again later"
      );
    });
    test("complete-exercise request is missing an exercise id, or exerciseData", async () => {
      let bodyData = [
        {
          exerciseId: "",
          exerciseData: { 1: 2 },
        },
        {
          exerciseId: "",
          exerciseData: {},
        },
        {},
      ];
      for (const body of bodyData) {
        const response = await request(app)
          .post("/exercise/complete")
          .send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("complete-exercise request is made with a non-existent or already completed exercise", async () => {
      jest.resetAllMocks();
      isExerciseComplete.mockResolvedValueOnce(true);
      const response = await request(app)
        .post("/exercise/complete")
        .send({
          userId: 1,
          exerciseId: 1,
          exerciseData: { 1: 2 },
        });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Exercise cannot be found or is already completed",
      });
    });
    test("complete-exercise cannot update exercise and word stats", async () => {
      jest.resetAllMocks();
      updateExerciseAndWordStats.mockImplementationOnce(() => {
        throw new Error();
      });
      const response = await request(app)
        .post("/exercise/complete")
        .send({
          exerciseId: 1,
          exerciseData: { 1: 2 },
        });
      expect(response.statusCode).toBe(500);
    });
  });

  describe("Begin exercise route", () => {
    test("Should call the getExerciseQuestions function with the right parameters", async () => {
      jest.resetAllMocks();
      getExerciseQuestions.mockResolvedValueOnce([1, 2, 3]);

      await request(app)
        .post("/exercise/begin")
        .send({
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: 3,
          },
        });
      expect(getExerciseQuestions.mock.calls.length).toBe(1);
    });
    //
    //
  });
});
