const request = require("supertest");
const app = require("../app.js");
const getExerciseQuestions = require('../helpers/getExerciseQuestions')
const IsExerciseComplete = require('../services/Exercises/IsExerciseComplete')
const updateExerciseAndWordStats = require('../services/Exercises/updateExerciseAndWordStats')
jest.mock('../helpers/getExerciseQuestions')
jest.mock('../services/Exercises/IsExerciseComplete')
jest.mock('../services/Exercises/updateExerciseAndWordStats')
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
    test("begin exercise request is made with a user that does not exist", async () => {
      const response = await request(app)
        .post("/exercise/begin")
        .send({
          userId: "n/a",
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: 2,
          },
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the user" });
    });
    test("begin exercise request has more words than the user has", async () => {
      getExerciseQuestions.mockResolvedValueOnce({error: 'Not enough words'});
      const response = await request(app)
        .post("/exercise/begin")
        .send({
          userId: "3",
          exerciseParameters: {
            wordTypes: [],
            notebooks: [],
            amount: 15000,
          },
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toEqual("Not enough words");
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
    test("complete-exercise request is made with a non-existent or already completed exercise", async () => {
      jest.resetAllMocks()  
      IsExerciseComplete.mockResolvedValueOnce(true)
        const response = await request(app)
          .post("/exercise/complete")
          .send( {
            userId: 1,
            exerciseId: 1,
            exerciseData: { 1: 2 },
          },);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Exercise cannot be found or is already completed" });
    });
    test("complete-exercise cannot update exercise and word stats", async () => {
      jest.resetAllMocks()  
      updateExerciseAndWordStats.mockImplementationOnce(()=> {throw new Error})
        const response = await request(app)
          .post("/exercise/complete")
          .send( {
            userId: 1,
            exerciseId: 1,
            exerciseData: { 1: 2 },
          },);
        expect(response.statusCode).toBe(500);
    });
  });

  describe("Begin exercise route", () => {
    test("Should call the getExerciseQuestions function with the right parameters", async () => {
      jest.resetAllMocks()
      getExerciseQuestions.mockResolvedValueOnce([1,2,3]);
      
      await request(app)
        .post("/exercise/begin")
        .send({
          userId: 1,
          exerciseParameters: {
            wordTypes: [1, 2, 3],
            notebooks: [1, 2, 3],
            amount: 3,
          },
        });
      expect(getExerciseQuestions.mock.calls.length).toBe(1);
      expect(getExerciseQuestions.mock.calls[0][0]["userId"]).toBe(1);
    });
    //
    //
  });

    // describe("Complete exercise route", () => {
    //   test("Should call the evaluateExercise function with the right parameters", async () => {});
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
    // });
});
