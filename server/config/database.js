const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();
const db = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

db.connect((err) => {
  if (err) {
    return console.error("Error:" + err.message);
  }
  console.log("Connected to MySQL server");
});

const getUserByUsername = async (username) => {
  const [results] = await db.query(
    `SELECT *
    FROM User
    WHERE Username = ?
    `,
    [username]
  );
  return results[0];
};

const getUserByUserId = async (userId) => {
  const [results] = await db.query(
    `SELECT *
    FROM User
    WHERE UserID = ?
    `,
    [userId]
  );
  return results[0];
};

const getUserByEmail = async (email) => {
  const [results] = await db.query(
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

    await db.query(
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
  const [notebooks] = await db.query(
    `SELECT * FROM Notebook WHERE CreatorID = ?`,
    [userId]
  );
  return notebooks;
};

const addNewNotebook = async ({ userId, notebookName }) => {
  try {
    await db.query(
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
  const result = await db.query(
    `SELECT * FROM Notebook WHERE CreatorID = ? AND NotebookID = ? `,
    [userId, notebookId]
  );
  return result[0][0] || false;
};

const updateNotebookName = async ({ userId, notebookId, newNotebookName }) => {
  try {
    let notebook = await findNotebook(userId, notebookId);
    if (!notebook) return { error: "Could not find the notebook" };

    await db.query(
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

    await db.query(`DELETE FROM notebook  WHERE (NotebookID = ?)`, [
      notebookId,
    ]);
    return { success: true };
  } catch (err) {
    return { error: err };
  }
};

const getUserWords = async({userId}) => {
  try{
    let [words] = await db.query(`SELECT * FROM Word WHERE CreatorID = ?`, [userId])
    return ({success: true, result: words})
  }catch(err){
    return({error: err})
  }
}

const addNewWord = async({userId, notebookId,  wordOriginal, wordTranslation, wordType}) => {
  try{
    let notebook = await findNotebook(userId, notebookId)
    if(!notebook) return { error: "Could not find the notebook" }

    await db.query(`INSERT INTO word (NotebookID, WordOriginal, WordTranslation, WordType, CreatorID) VALUES (?, ?, ?, ?, ?);`, [notebookId, wordOriginal, wordTranslation, wordType, userId])
    return ({success: true})
  }catch(err){
    return ({error:err})
  }
}

const updateWord = async({userId, notebookId,  wordOriginal, wordTranslation, wordType}) => {

}

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
  addNewWord
};
