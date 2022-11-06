
const db = require("../../config/database");
module.exports = async function(exerciseId){
    try {
      let [query] = await db.execute(
        "SELECT ExerciseCompleted FROM Exercise WHERE ExerciseID = ?",
        [exerciseId]
      );
  
      return "true" === query[0]["ExerciseCompleted"];
    } catch {
        //Return true to stop the process
      return true;
    }
  };
  