const db = require("../config/database");
const GetUser = require('../services/GetUser')

const getUserNotebooks = async (userId) => {
  const [notebooks] = await db.execute(
    `SELECT * FROM Notebook WHERE CreatorID = ?`,
    [userId]
  );
  return notebooks;
};

const AddNew = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookName) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let {userId, notebookName} = req.body


    let user = await GetUser.byUserId(userId);
    if (!user) {
      res.status(400).json({ error: "User cannot be found" });
      return;
    }

    await db.execute(
      `INSERT INTO notebook (NotebookName, CreatorID) VALUES (?, ?);`,
      [notebookName, userId]
    );
    res.status(200).json({ addNotebookSuccess: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const findNotebook = async (userId, notebookId) => {
  const result = await db.execute(
    `SELECT * FROM Notebook WHERE CreatorID = ? AND NotebookID = ? `,
    [userId, notebookId]
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

module.exports = {
  getUserNotebooks,
  AddNew,
  updateNotebookName,
  deleteNotebook,
};
