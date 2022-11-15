const Exercise = require("../models/Exercise.model");
module.exports = async function (exerciseId) {
  try {
    let query = await Exercise.findOne({
      attributes: ["ExerciseCompleted"],
      where: {
        ExerciseID: exerciseId,
      },
    });

    let exerciseCompleted = query.dataValues.ExerciseCompleted;

    if (exerciseCompleted == null) exerciseCompleted = true;
    return exerciseCompleted;
  } catch {
    //Return true to stop the process
    return true;
  }
};
