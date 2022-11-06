const IsExerciseComplete = require("../../services/Exercises/IsExerciseComplete");

describe("Is exercise complete  ", () => {
  test("should return true when the query fails (possibly for a non-existent entry)", async () => {
    let query = await IsExerciseComplete("n/a");
    expect(query).toBe(true);
  });
});
