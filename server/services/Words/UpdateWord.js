const GetWord = require("./GetWord");
const GetNotebook = require("../Notebooks/GetNotebook");
const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    if (hasMissingFields(req.body)) {
      res.status(400).json({error: 'Missing required fields'});
      return;
    }

    let {userId, notebookId, wordOriginal, wordTranslation, wordType, wordId} = req.body

    let word = await GetWord(wordId, notebookId, userId);
    if (!word) {
      res.status(400).json({ error: "Could not find word" });
    }

    let notebook = await GetNotebook(userId, notebookId);
    if (!notebook)  { 
        res.status(400).json({ error: 'Could not find notebook' });
     };

    await db.execute(
        `UPDATE Word SET NotebookID = ?, WordOriginal = ?,  WordTranslation = ?, WordType = ? WHERE (WordID = ?)`,
        [notebookId, wordOriginal, wordTranslation, wordType, wordId]
      );

    res.status(200).json({ updateWordSuccess: true });
  } catch (err) {
    console.log(err)
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
    "wordId"
  ];

  for (const key of requiredKeys) {
    if (!obj[key]) {
        console.log(key)
      return true;
    }
  }
  return false;
};