const GetNotebook = require("../Notebooks/GetNotebook");
const Word = require('../../models/Word.model')
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

    await Word.create(
      {     
        NotebookID: notebookId ,
        WordOriginal: wordOriginal,
        WordTranslation: wordTranslation,
        WordType: wordType,
        CreatorID: userId
      })
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
