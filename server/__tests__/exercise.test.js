const request = require("supertest");
const createApp = require("../app.js");
const database = require("../config/database");
const completeExercise = jest.fn();
const createExerciseWords = jest.fn();
const createNewExercise = jest.fn();
const updateExerciseWordsAfterExerciseIsCompleted = jest.fn();
const app = createApp({
  ...database,
    createNewExercise: createNewExercise,
  //   createExerciseWords: createExerciseWords,
  //   completeExercise: completeExercise,
  //   updateExerciseWordsAfterExerciseIsCompleted: updateExerciseWordsAfterExerciseIsCompleted
});

describe("Exercise route", () => {
  describe("should return errors when", () => {
    test("get exercise request is missing a user or exercise id", async () => {
      let bodyData = [
        {
          userId: "",
          exerciseId: "",
        },
        {
          userId: "test-username",
          exerciseId: "",
        },
      ];
      for (const body of bodyData) {
        const response = await request(app).get("/exercise/get").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });

    test("get all exercises is missing user id", async () => {
      const response = await request(app)
        .get("/exercise/get-all")
        .send({ userId: "" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    });

    test("begin-exercise request is missing a user id or word amount", async () => {
      let bodyData = [
        {
          userId: "",
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: 10,
          },
        },
        {
          userId: 1,
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: "",
          },
        },
        {},
      ];
      for (const body of bodyData) {
        const response = await request(app).post("/exercise/begin").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });

    test("complete-exercise request is missing a user id, exercise id, or exerciseData", async () => {
      let bodyData = [
        {
          userId: "",
          exerciseId: "",
          exerciseData: { 1: 2 },
        },
        {
          userId: "test-username",
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
  });

  describe("Begin exercise route", () => {
    test("Should call the createNewExercise function with the correct exercise and userId", async () => {
      createNewExercise.mockReturnValueOnce({
        statusCode: 200,
      });
      await request(app)
        .post("/exercise/begin")
        .send({
          userId: 1,
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: 1,
          },
        });

      expect(createNewExercise.mock.calls.length).toBe(1);
      expect(createNewExercise.mock.calls[0][0]["userId"]).toBe(1);
    });

    //Should call the getExerciseQuestions function with the right parameters
    //
  });

  //   describe("Complete exercise route", () => {
  //     test("Should call the evaluateExercise function with the right parameters", async () => {});
  //     //
  //     //
  //     test("Should call the updateExerciseStats function in db", async () => {
  //         completeExercise.mockReturnValueOnce({
  //           statusCode: 200,
  //         });
  //         let testExerciseData = new Array(10).fill({})
  //         await request(app)
  //           .post("/exercise/complete")
  //           .send({
  //             userId: 5,
  //             exerciseId: 1,
  //             exerciseData: testExerciseData,
  //           });

  //         expect(completeExercise.mock.calls.length).toBe(1);
  //         expect(completeExercise.mock.calls[0][0]['userId']).toBe(5);
  //         expect(completeExercise.mock.calls[0][0]['exerciseId']).toBe(1);
  //       });
  //     //Should update each exercise word based on user id
  //     test("Should call the updateExerciseStats function in db", async () => {
  //         updateExerciseWordsAfterExerciseIsCompleted.mockReturnValueOnce({
  //           statusCode: 200,
  //         });
  //         let testExerciseData = new Array(10).fill({})
  //         await request(app)
  //           .post("/exercise/complete")
  //           .send({
  //             userId: 5,
  //             exerciseId: 1,
  //             exerciseData: testExerciseData,
  //           });

  //         expect(updateExerciseWordsAfterExerciseIsCompleted.mock.calls.length).toBe(1);
  //         expect(updateExerciseWordsAfterExerciseIsCompleted.mock.calls[0][0]['userId']).toBe(5);
  //         expect(updateExerciseWordsAfterExerciseIsCompleted.mock.calls[0][0]['exerciseId']).toBe(1);
  //         expect(updateExerciseWordsAfterExerciseIsCompleted.mock.calls[0][0]['exerciseWords']).toHaveLength(15);
  //       });

  //   test("Should call the function to create exerciseWords db entries", async () => {
  //     createExerciseWords.mockReturnValueOnce({
  //       statusCode: 200,
  //     });
  //     let testExerciseData = new Array(10).fill({})
  //           await request(app).post("/exercise/complete").send({
  //             userId: 5,
  //             exerciseId: 1,
  //             exerciseData: testExerciseData,
  //           });

  //     expect(createExerciseWords.mock.calls.length).toBe(1);
  //     expect(createExerciseWords.mock.calls[0][0]["exerciseWords"]).toHaveLength(
  //       10
  //     );
  //   });
  //   });
});
