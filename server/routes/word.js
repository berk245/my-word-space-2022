const express = require("express");
const { deleteWord } = require("../config/database");
const router = express.Router();
const GetAllWords = require('../services/Words/GetAllWords')
const AddWord = require('../services/Words/AddWord')

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

  router.get("/get-all", GetAllWords);
  router.post("/add", AddWord);
  router.post("/update", updateWord);
  router.delete("/delete", deleteWord);

  return router;
};
