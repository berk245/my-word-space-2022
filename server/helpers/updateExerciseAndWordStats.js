const Exercise = require("../models/Exercise.model");
const Word = require("../models/Word.model");

module.exports = async function (userId, { exerciseId, exerciseData }) {
  let correctCount = 0;
  exerciseData.map(async (exerciseWord) => {
    if (exerciseWord.userAnswer === exerciseWord.WordTranslation)
      correctCount += 1;
    await updateWordStats(userId, exerciseWord);
  });

  await updateExerciseStatsAfterCompletion({
    userId: userId,
    exerciseId: exerciseId,
    correctCount: correctCount,
  });
  return true;
};

const updateWordStats = async (userId, exerciseWordData) => {
  let isUserAnswerCorrect =
    exerciseWordData.userAnswer === exerciseWordData.WordTranslation;

  if (isUserAnswerCorrect) exerciseWordData.CorrectAnswers += 1;

  await Word.update(
    {
      LastSeenAt: new Date(),
      TimesSeen: exerciseWordData.TimesSeen + 1,
      CorrectAnswers: exerciseWordData.CorrectAnswers,
    },
    {
      where: {
        WordID: exerciseWordData.WordID,
        CreatorID: userId
      },
    }
  );
};

const updateExerciseStatsAfterCompletion = async ({
  userId,
  exerciseId,
  correctCount,
}) => {
  await Exercise.update(
    {
      ExerciseCompleted: 1,
      CorrectAnswers: correctCount,
    },
    {
      where: {
        ExerciseID: exerciseId,
        UserID: userId
      },
    }
  );

  return true;
};