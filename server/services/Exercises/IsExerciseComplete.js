
const Exercise = require("../../models/Exercise.model")
module.exports = async function(exerciseId){
    try {
      let exerciseCompleted = await Exercise.findOne({
        attributes: ['ExerciseCompleted'],
        where:{
          ExerciseID: exerciseId
        }
      })
      return exerciseCompleted || true;
    } catch {
        //Return true to stop the process
      return true;
    }
  };
  