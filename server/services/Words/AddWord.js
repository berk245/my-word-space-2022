const findNotebook = require("../../helpers/findNotebook");
const Word = require("../../models/Word.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if (hasMissingFields(req.body)) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { notebookId, wordOriginal, wordTranslation, wordType } =
      req.body;

    let notebook = await findNotebook(req.userId, notebookId);
    if (!notebook) {
      res.status(404).json({ error: "Could not find the notebook" });
      return;
    }

    const wordTypes = ["adjective", "noun", "verb", "other"]
    if(!wordTypes.includes(wordType)){
      res.status(500).json({ error: "Invalid word type" });
      return;
    }

    await Word.create({
      NotebookID: notebookId,
      WordOriginal: wordOriginal,
      WordTranslation: wordTranslation,
      WordType: wordType,
      CreatorID: req.userId,
    });
    res.status(200).json({ addWordSuccess: true });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /word/add",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};

const hasMissingFields = (obj) => {
  const requiredKeys = [
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
