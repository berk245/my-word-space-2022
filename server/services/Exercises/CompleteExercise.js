const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.exerciseId || !req.body.exerciseData) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    if (await isValidExercise(req.body.exerciseId)) {
      res
        .status(400)
        .json({ error: "Exercise cannot be find or is already completed" });
      return;
    }
    /*This function does two things to avoid iterating the array two times
      1st iteration to evaluate the user answer and updating the word stats
      2nd iteration to update the exercise data (how many correct answers) 
      Clean up and make it more obvious if possible */
    await updateExerciseAndWordStats(req.body);
    res.status(200).send({ exerciseCompletionSuccess: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const updateExerciseAndWordStats = async function ({
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

const isValidExercise = async (exerciseId) => {
  try {
    let [query] = await db.execute(
      "SELECT ExerciseCompleted FROM Exercise WHERE ExerciseID = ?",
      [exerciseId]
    );

    return "true" === query[0]["ExerciseCompleted"];
  } catch {
    return true;
  }
};
