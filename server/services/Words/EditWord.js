const findWord = require("../../helpers/findWord");

module.exports = async (req, res) => {
  if (hasMissingFields(req.body)) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  let { userId, notebookId, wordOriginal, wordTranslation, wordType, wordId } =
    req.body;

  let word = await findWord(wordId, userId);
  if (!word) {
    res.status(500).json({ error: "Could not find the word" });
    return;
  }

  word
    .update(
      {
        WordID: wordId,
        NotebookID: notebookId,
        WordOriginal: wordOriginal,
        WordTranslation: wordTranslation,
        WordType: wordType
      },
      {
        where: {
          WordID: wordId,
          NotebookID: notebookId,
          CreatorID: userId,
        },
      }
    )
    .then(() => {
      res.status(200).json({ updateWordSuccess: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const hasMissingFields = (obj) => {
  const requiredKeys = [
    "userId",
    "notebookId",
    "wordType",
    "wordOriginal",
    "wordTranslation",
    "wordId",
  ];

  for (const key of requiredKeys) {
    if (!obj[key]) {
      console.log(key);
      return true;
    }
  }
  return false;
};
