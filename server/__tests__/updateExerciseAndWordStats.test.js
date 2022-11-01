const updateExerciseAndWordStats = require("../helpers/updateExerciseAndWordStats");

const updateWordStats = jest.fn();
const updateExerciseStatsAfterCompletion = jest.fn();
const database = {
  updateWordStats: updateWordStats,
  updateExerciseStatsAfterCompletion: updateExerciseStatsAfterCompletion,
};
let params = {
    exerciseId: 1,
    exerciseData: [
      {
        WordTranslation: "test",
        userAnswer: "test",
      },
      {
        WordTranslation: "test",
        userAnswer: "wrong",
      },
      {
        WordTranslation: "test",
        userAnswer: "wrong",
      },
      {
        WordTranslation: "test",
        userAnswer: "",
      },
      {
        WordTranslation: "test",
        userAnswer: "test",
      },
      {
        WordTranslation: "test",
        userAnswer: "test",
      },
      {
        WordTranslation: "test",
        userAnswer: "test",
      },
    ],
  };
describe("Update exercise and word stats function", () => {
  test("Should call the update exercise stats function with the right count", async () => {
    updateWordStats.mockReturnValueOnce(true);
    updateExerciseStatsAfterCompletion.mockReturnValueOnce(true);

    await updateExerciseAndWordStats(database, params);

    expect(updateExerciseStatsAfterCompletion.mock.calls.length).toBe(1);
    expect(
        updateExerciseStatsAfterCompletion.mock.calls[0][0]["exerciseId"]
      ).toBe(1);
      expect(
        updateExerciseStatsAfterCompletion.mock.calls[0][0]["correctCount"]
      ).toBe(4);
  });

  test("Should call the update word stats function with the right exercise count", async () => {
    updateWordStats.mockClear();
    updateWordStats.mockReturnValue(true);

    await updateExerciseAndWordStats(database, params);

    expect(updateWordStats.mock.calls.length).toBe(7);
    
  });

});
