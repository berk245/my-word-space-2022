const createQuestionPool = require('../services/Exercises/CreateQuestionPool')

module.exports = async function ({ userId, exerciseParameters }) {
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
    result.push(wordPool[idx]);
  });

  return result;
};

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
