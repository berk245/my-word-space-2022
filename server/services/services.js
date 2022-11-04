
const createQuestionPoolQuery = require("../helpers/createQuestionPoolQuery");
const db = require('../config/database') 


  
  
 
  

  


  
  
  
  
  
  const getUserExercises = async (userId) => {
    try {
      let user = await getUserByUserId(userId);
      if (!user) return { error: "Could not find the user" };
  
      let [exercises] = await db.execute(
        `SELECT * FROM Exercise WHERE UserID = ?  `,
        [userId]
      );
      return { success: true, result: exercises };
    } catch (err) {
      return { error: err };
    }
  };
  
  const getSingleExercise = async ({ userId, exerciseId }) => {
    try {
      let user = await getUserByUserId(userId);
      if (!user) return { error: "Could not find the user" };
  
      let [exercise] = await db.execute(
        `SELECT * FROM Exercise WHERE UserID = ? AND ExerciseID = ? `,
        [userId, exerciseId]
      );
  
      return { success: true, result: exercise[0] };
    } catch (err) {
      return { error: err };
    }
  };
  const createNewExercise = async ({ userId, amount }) => {
    try {
      let user = await getUserByUserId(userId);
      if (!user) return { error: "Could not find the user" };
  
      let exercise = await db.execute(
        "INSERT INTO `my-word-space`.`Exercise` (`UserID` , `QuestionCount`) VALUES (?, ?)",
        [userId, amount]
      );
      return exercise[0].insertId;
    } catch (err) {
      return false;
    }
  };
  const createQuestionPool = async ({ userId, exerciseParameters }) => {
    let [pool] = await db.execute(
      createQuestionPoolQuery(userId, exerciseParameters)
    );
    return pool || [];
  };
  const updateWordStats = async (exerciseWordData) => {
    let now = new Date();
    let isUserAnswerCorrect =
      exerciseWordData.userAnswer === exerciseWordData.WordTranslation;
  
    if (isUserAnswerCorrect) exerciseWordData.CorrectAnswers+= 1;
  
    await db.execute(
      `UPDATE Word SET LastSeenAt = ?, TimesSeen = ?, CorrectAnswers = ? WHERE (WordID = ?)`,
      [
        now,
        exerciseWordData.TimesSeen+1,
        exerciseWordData.CorrectAnswers,
        exerciseWordData.WordID,
      ]
    );
  };
  const findExercise = async(exerciseId) => {
  
    let [exercise] = await db.execute("SELECT * FROM Exercise WHERE ExerciseID = ?", [exerciseId]);
     return exercise.length
  }
  const isExerciseComplete = async(exerciseId) => {
  
    let [query] = await db.execute("SELECT ExerciseCompleted FROM Exercise WHERE ExerciseID = ?", [exerciseId]);
    return 'true' === query[0]['ExerciseCompleted']
  }
  const updateExerciseStatsAfterCompletion = async ({exerciseId: exerciseId, correctCount: correctCount}) => {
      await db.execute(
        `UPDATE Exercise SET ExerciseCompleted = true, CorrectAnswers = ? WHERE (ExerciseID = ?)`,
        [correctCount, exerciseId]
      );
      return true;
  };
  
  
  module.exports = {
    getUserExercises,
    getSingleExercise,
    createNewExercise,
    createQuestionPool,
    updateWordStats,
    updateExerciseStatsAfterCompletion,
    findExercise,
    isExerciseComplete
  };
  