const Exercise = require("../models/Exercise.model");
module.exports = async function (userId, exerciseId) {
  try {
    let query = await Exercise.findOne({
      attributes: ["ExerciseCompleted"],
      where: {
        ExerciseID: exerciseId,
        UserID: userId,
      },
    });

    let exerciseCompleted = query.dataValues.ExerciseCompleted;

    if (exerciseCompleted == null) exerciseCompleted = true;
    return exerciseCompleted;
  } catch {
    CloudWatch.log(
      "error",
      `Error while accessing exercise info`,
      `Error details: ${err}`,
      `userId: ${userId}`,
      `Exercise ID: ${exerciseId}`
    );
    //Return true to stop the process
    return true;
  }
};
