const db = require("../../config/database");
const Exercise = require('../../models/Exercise.model')

module.exports = async ({ userId, amount }) => {
    try {
      let newExercise = await Exercise.create(
        {
          UserId: userId,
          QuestionCount: amount
        }
      )
      return newExercise.dataValues.ExerciseID;
    } catch (err) {
        return false;
    }
  };


