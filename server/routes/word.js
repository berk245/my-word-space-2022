const express = require("express");
const { deleteWord } = require("../config/database");
const router = express.Router();

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

const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
  const getUserWords = async (req, res) => {
    if (!req.body.userId) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let query = await database.getUserWords(req.body);

    query.success
      ? res.status(200).json({ words: query.result })
      : res.status(400).json({ error: query.error });
  };

  const addNewWord = async (req, res) => {
    if (hasMissingFields(req.body)) {
      res.status(400).json(missingFieldsError);
      return;
    }
    const query = await database.addNewWord(req.body);

    query.success
      ? res.status(200).json({ addNotebookSuccess: true })
      : res.status(400).json({ error: query.error });
  };

  const updateWord = async (req, res) => {
    if (hasMissingFields(req.body) || !req.body.wordId) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let query = await database.deleteWord(req.body);

    query.success
      ? res.status(200).json({ deleteWordSuccess: true })
      : res.status(400).json({ error: query.error });
  };

  const deleteWord = async (req, res) => {
    if (!req.body.userId || !req.body.notebookId || !req.body.wordId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    let query = await database.deleteWord(req.body);
    query.success
      ? res.status(200).json({ deleteWordSuccess: true })
      : res.status(400).json({ error: query.error });
  };

  router.get("/get-all", getUserWords);
  router.post("/add", addNewWord);
  router.post("/update", updateWord);
  router.delete("/delete", deleteWord);

  return router;
};
