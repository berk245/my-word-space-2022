
const isExerciseComplete = require('../../helpers/isExerciseComplete.js')
const updateExerciseAndWordStats = require('../../helpers/updateExerciseAndWordStats.js')
const CloudWatch = require("../../config/logger");

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
    await updateExerciseAndWordStats(req.body);
    res.status(200).send({ exerciseCompletionSuccess: true });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /exercise/complete",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};



