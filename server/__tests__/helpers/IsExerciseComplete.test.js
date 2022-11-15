const isExerciseComplete = require("../../helpers/isExerciseComplete");

describe("Is exercise complete  ", () => {
  test("should return true when the query fails (possibly for a non-existent entry)", async () => {
    let query = await isExerciseComplete("n/a");
    expect(query).toBe(true);
  });
});
