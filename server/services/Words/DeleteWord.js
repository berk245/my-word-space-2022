const GetWord = require("./GetWord");
const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId || !req.body.wordId) {
      res.status(400).json({ error: "Missing required fields" });
    }
    let {wordId, notebookId, userId} = req.body;
    let word = await GetWord(wordId, notebookId, userId);
    if (!word) res.status(400).json({ error: "Could not find the word" });

    await db.execute(
      `DELETE FROM Word WHERE WordID = ? AND CreatorID = ? AND NotebookID = ?`,
      [wordId, userId, notebookId]
    );
    res.status(200).json({ deleteWordSuccess: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
