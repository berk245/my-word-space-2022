module.exports = async function (
  exerciseParameters,
  userId,
  createQuestionPool
) {
  try {
    let wordPool = await createQuestionPool({
      userId,
      exerciseParameters,
    });

    if (wordPool.length < exerciseParameters.amount) {
      return { error: "Not enough words" };
    }

    let uniqueIndexes = getUniqueIndexes(wordPool, exerciseParameters.amount);

    let result = [];

    uniqueIndexes.map((idx) => {
      result.push({ ...wordPool[idx].dataValues, userAnswer: "" });
    });

    return result;
  } catch (err) {
    CloudWatch.log(
      "error",
      `Error while getting exercise questions`,
      `Error details: ${err}`,
      `userId: ${userId}`,
      `Exercise parameters: ${exerciseParameters}`
    );
    return { error: "An error occured" };
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getUniqueIndexes(wordPool, amount) {
    let uniqueIndexes = new Set();

    while (uniqueIndexes.size < amount) {
      let randomIndex = getRandomInt(wordPool.length - 1);
      uniqueIndexes.add(randomIndex);
    }

    return Array.from(uniqueIndexes);
  }
};
