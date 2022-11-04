const db = require("../../config/database");

module.exports = async (wordId, notebookId, userId) => {
    const result = await db.execute(
      `SELECT * FROM Word WHERE  WordID = ? AND NotebookID = ? AND CreatorID = ?  `,
      [wordId, notebookId, userId]
    );
    return result[0][0] || false;
  };