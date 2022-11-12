const express = require("express");
const router = express.Router();
const GetAllWords = require("../services/Words/GetAllWords");
const AddWord = require("../services/Words/AddWord");
const EditWord = require("../services/Words/EditWord");
const DeleteWord = require("../services/Words/DeleteWord");
const GetWordData = require("../services/Words/GetWordData");
module.exports = function () {
  router.get("/get-all", GetAllWords);
  router.get("/:wordId", GetWordData)
  router.post("/add", AddWord);
  router.post("/edit", EditWord);
  router.delete("/delete", DeleteWord);

  return router;
};
