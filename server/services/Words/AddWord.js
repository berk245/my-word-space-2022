const db = require("../../config/database");
const GetNotebook = require("../Notebooks/GetNotebook");
module.exports = async (req, res) => {
  try {
    if (hasMissingFields(req.body)) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { notebookId, wordOriginal, wordTranslation, wordType, userId } =
      req.body;

    let notebook = await GetNotebook(userId, notebookId);
    if (!notebook)  { 
        res.status(400).json({ error: 'Could not find the notebook' });
        return
     };

    await db.execute(
      `INSERT INTO word (NotebookID, WordOriginal, WordTranslation, WordType, CreatorID) VALUES (?, ?, ?, ?, ?);`,
      [notebookId, wordOriginal, wordTranslation, wordType, userId]
    );
    res.status(200).json({ addWordSuccess: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const hasMissingFields = (obj) => {
  const requiredKeys = [
    "userId",
    "notebookId",
    "wordType",
    "wordOriginal",
    "wordTranslation",
  ];

  for (const key of requiredKeys) {
    if (!obj[key]) {
      return true;
    }
  }
  return false;
};
