const express = require("express");
const router = express.Router();
const GetAllWords = require('../services/Words/GetAllWords')
const AddWord = require('../services/Words/AddWord')
const UpdateWord = require('../services/Words/UpdateWord')
const DeleteWord = require('../services/Words/DeleteWord')

module.exports = function () {
  router.get("/get-all", GetAllWords);
  router.post("/add", AddWord);
  router.post("/update", UpdateWord);
  router.delete("/delete", DeleteWord);

  return router;
};
