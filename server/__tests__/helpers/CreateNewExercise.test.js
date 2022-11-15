const CreateNewExercise = require('../../helpers/CreateNewExercise')

describe("Create new exercise", () => {
    test("should return error when it is called without a user id or exercise id", async () => {
        let bodyData = [
            {
              userId: "",
              exerciseId: "",
            },
            {
              userId: "test-username",
              exerciseId: "",
            },
            {
                userId: "",
                exerciseId: "321",
              },
              {}
          ];
          for (const body of bodyData) {
            let query = await CreateNewExercise(body)
            expect(query).toBe(false);
          }
      })
})
      
    