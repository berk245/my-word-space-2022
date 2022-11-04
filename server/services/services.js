const bcrypt = require("bcrypt");
const createQuestionPoolQuery = require("../helpers/createQuestionPoolQuery");
const db = require('../config/database') 

db.connect((err) => {
    if (err) {
      return console.error("Error:" + err.message);
    }
    console.log("Connected to MySQL server");
  });

const getUserByUsername = async (username) => {
    const [results] = await db.execute(
      `SELECT *
      FROM User
      WHERE Username = ?
      `,
      [username]
    );
    return results[0];
  };
  
  const getUserByUserId = async (userId) => {
    const [results] = await db.execute(
      `SELECT *
      FROM User
      WHERE UserID = ?
      `,
      [userId]
    );
    return results[0];
  };
  
  const getUserByEmail = async (email) => {
    const [results] = await db.execute(
      `SELECT *
      FROM User
      WHERE email = ?
      `,
      [email]
    );
    return results[0];
  };
  
  const saveUserToDatabase = async ({ username, email, password }) => {
    try {
      let hashedPassword = await bcrypt.hash(password, 13); //13 refers to the amount of times the password gets rehashed. The larger the number, more secure the hashed password is. But also the algorith takes more time!
  
      await db.execute(
        "INSERT INTO `my-word-space`.`User` (`Username`, `Email`, `Password`) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  const getUserNotebooks = async (userId) => {
    const [notebooks] = await db.execute(
      `SELECT * FROM Notebook WHERE CreatorID = ?`,
      [userId]
    );
    return notebooks;
  };
  
  const addNewNotebook = async ({ userId, notebookName }) => {
    try {
      await db.execute(
        `INSERT INTO notebook (NotebookName, CreatorID) VALUES (?, ?);`,
        [notebookName, userId]
      );
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  };
  
  const findNotebook = async (userId, notebookId) => {
    const result = await db.execute(
      `SELECT * FROM Notebook WHERE CreatorID = ? AND NotebookID = ? `,
      [userId, notebookId]
    );
    return result[0][0] || false;
  };
  const findWord = async (wordId, notebookId, userId) => {
    const result = await db.execute(
      `SELECT * FROM Word WHERE  WordID = ? AND NotebookID = ? AND CreatorID = ?  `,
      [wordId, notebookId, userId]
    );
    return result[0][0] || false;
  };
  
  const updateNotebookName = async ({ userId, notebookId, newNotebookName }) => {
    try {
      let notebook = await findNotebook(userId, notebookId);
      if (!notebook) return { error: "Could not find the notebook" };
  
      await db.execute(
        `UPDATE notebook SET NotebookName = ? WHERE (NotebookID = ?)`,
        [newNotebookName, notebookId]
      );
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };
  
  const deleteNotebook = async ({ userId, notebookId }) => {
    try {
      let notebook = await findNotebook(userId, notebookId);
      if (!notebook) return { error: "Could not find the notebook" };
  
      await db.execute(`DELETE FROM notebook  WHERE (NotebookID = ?)`, [
        notebookId,
      ]);
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };
  
  const getUserWords = async ({ userId }) => {
    try {
      let [words] = await db.execute(
        `SELECT * FROM Word WHERE CreatorID = ? AND Status = 'active'`,
        [userId]
      );
      return { success: true, result: words };
    } catch (err) {
      return { error: err };
    }
  };
  
  const addNewWord = async ({
    userId,
    notebookId,
    wordOriginal,
    wordTranslation,
    wordType,
  }) => {
    try {
      let notebook = await findNotebook(userId, notebookId);
      if (!notebook) return { error: "Could not find the notebook" };
  
      await db.execute(
        `INSERT INTO word (NotebookID, WordOriginal, WordTranslation, WordType, CreatorID) VALUES (?, ?, ?, ?, ?);`,
        [notebookId, wordOriginal, wordTranslation, wordType, userId]
      );
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };
  
  const updateWord = async ({
    userId,
    wordId,
    notebookId,
    wordOriginal,
    wordTranslation,
    wordType,
  }) => {
    try {
      let word = await findWord(wordId, notebookId, userId);
      if (!word) return { error: "Could not find the word" };
  
      await db.execute(
        `UPDATE Word SET NotebookID = ?, WordOriginal = ?,  WordTranslation = ?, WordType = ? WHERE (WordID = ?)`,
        [notebookId, wordOriginal, wordTranslation, wordType, wordId]
      );
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };
  
  const deleteWord = async ({ userId, wordId, notebookId }) => {
    try {
      let word = await findWord(wordId, notebookId, userId);
      if (!word) return { error: "Could not find the word" };
  
      await db.execute(
        `DELETE FROM Word WHERE WordID = ? AND CreatorID = ? AND NotebookID = ?`,
        [wordId, userId, notebookId]
      );
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };
  
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
    getUserByEmail,
    getUserByUsername,
    getUserByUserId,
    saveUserToDatabase,
    getUserNotebooks,
    addNewNotebook,
    updateNotebookName,
    deleteNotebook,
    getUserWords,
    addNewWord,
    updateWord,
    deleteWord,
    getUserExercises,
    getSingleExercise,
    createNewExercise,
    createQuestionPool,
    updateWordStats,
    updateExerciseStatsAfterCompletion,
    findExercise,
    isExerciseComplete
  };
  