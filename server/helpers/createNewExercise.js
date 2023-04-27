const Exercise = require('../models/Exercise.model')
const CloudWatch = require('../config/logger')

module.exports = async ({ userId, amount }) => {
    try {
      let newExercise = await Exercise.create(
        {
          UserID: userId,
          QuestionCount: amount
        }
      )
      return newExercise.dataValues.ExerciseID;
    } catch (err) {
        CloudWatch.log(
          "error", `Error while creating new exercise:${err}`
          `Error details: ${err}`,
          `userId: ${userId}`, 
          `OuestionCount: ${amount}`
          )
        return false;
    }
  };


