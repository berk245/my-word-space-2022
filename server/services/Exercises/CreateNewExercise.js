const Exercise = require('../../models/Exercise.model')

module.exports = async ({ userId, amount }) => {
    try {
      console.log('We are here', userId, amount)
      let newExercise = await Exercise.create(
        {
          UserID: userId,
          QuestionCount: amount
        }
      )
      return newExercise.dataValues.ExerciseID;
    } catch (err) {
      console.log(err)
        return false;
    }
  };


