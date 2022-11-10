
const Exercise = require("../../models/Exercise.model");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.exerciseId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { userId, exerciseId } = req.body;

    const exercise = await Exercise.findOne({
      where: {
        ExerciseID: exerciseId,
        UserID: userId,
      },
    });

    if (!exercise) res.status(400).json({ error: "Could not find the exercise" });
    else res.status(200).json({ exercise: exercise });

    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }

};
