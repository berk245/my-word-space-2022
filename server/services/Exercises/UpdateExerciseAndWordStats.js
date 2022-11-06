const db = require("../../config/database");

module.exports  = async function ({
    exerciseId,
    exerciseData,
  }) {
    let correctCount = 0;
    exerciseData.map(async (exerciseWord) => {
      if (exerciseWord.userAnswer === exerciseWord.WordTranslation)
        correctCount += 1;
      await updateWordStats(exerciseWord);
    });
  
    await updateExerciseStatsAfterCompletion({
      exerciseId: exerciseId,
      correctCount: correctCount,
    });
    return true;
  };
  
  const updateWordStats = async (exerciseWordData) => {
    let now = new Date();
    let isUserAnswerCorrect =
      exerciseWordData.userAnswer === exerciseWordData.WordTranslation;
  
    if (isUserAnswerCorrect) exerciseWordData.CorrectAnswers += 1;
  
    await db.execute(
      `UPDATE Word SET LastSeenAt = ?, TimesSeen = ?, CorrectAnswers = ? WHERE (WordID = ?)`,
      [
        now,
        exerciseWordData.TimesSeen + 1,
        exerciseWordData.CorrectAnswers,
        exerciseWordData.WordID,
      ]
    );
  };
  
  const updateExerciseStatsAfterCompletion = async ({
    exerciseId: exerciseId,
    correctCount: correctCount,
  }) => {
    await db.execute(
      `UPDATE Exercise SET ExerciseCompleted = true, CorrectAnswers = ? WHERE (ExerciseID = ?)`,
      [correctCount, exerciseId]
    );
    return true;
  };