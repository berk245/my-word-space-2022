
const isExerciseComplete = require('../../helpers/isExerciseComplete.js')
const updateExerciseAndWordStats = require('../../helpers/updateExerciseAndWordStats.js')
module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.exerciseId || !req.body.exerciseData) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    if (await isExerciseComplete(req.body.exerciseId)) {
      res
        .status(400)
        .json({ error: "Exercise cannot be found or is already completed" });
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



