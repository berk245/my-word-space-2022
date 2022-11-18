const findWord = require("../../helpers/findWord");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  if (hasMissingFields(req.body)) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  let { userId, notebookId, wordOriginal, wordTranslation, wordType, wordId } =
    req.body;

  let word = await findWord(wordId, userId, notebookId);
  if (!word) {
    res.status(404).json({ error: "Could not find the word" });
    return;
  }

  const wordTypes = ["adjective", "noun", "verb", "other"];
  if (!wordTypes.includes(wordType)) {
    res.status(500).json({ error: "Invalid word type" });
    return;
  }

  word
    .update(
      {
        WordID: wordId,
        NotebookID: notebookId,
        WordOriginal: wordOriginal,
        WordTranslation: wordTranslation,
        WordType: wordType,
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
      CloudWatch.log(
        "error",
        "error in /word/edit",
        `Error details: ${err}`,
        `Request body: ${req.body}`
      );
      res.status(500).send("Server error");
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
      return true;
    }
  }
  return false;
};
