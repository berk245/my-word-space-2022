const getExerciseQuestions = require("../../helpers/getExerciseQuestions");

const createQuestionPool = jest.fn();

describe("Get exercise questions function", () => {
  test("Should return error when requested exercise amount is more than word count", async () => {
    createQuestionPool.mockReturnValueOnce([1, 2]);

    const exerciseWords = await getExerciseQuestions(
      {
        userId: 1,
        exerciseParameters: { amount: 5 },
      },
      createQuestionPool
    );

    expect(exerciseWords.error).toBe("Not enough words");
  });

  //

  test("Should return an array of objects in the size of requested amount", async () => {
    createQuestionPool.mockReturnValueOnce(new Array(30).fill(1));

    const exerciseWords = await getExerciseQuestions(
      {
        userId: 1,
        exerciseParameters: { amount: 5 },
      },
      createQuestionPool
    );

    expect(exerciseWords).toHaveLength(5);
  });
});
