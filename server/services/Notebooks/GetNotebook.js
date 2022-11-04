const db = require("../../config/database");

module.exports = async (userId, notebookId) => {
    const result = await db.execute(
      `SELECT * FROM Notebook WHERE CreatorID = ? AND NotebookID = ? `,
      [userId, notebookId]
    );
    return result[0][0] || false;
  };