const express = require("express");
const router = express.Router();


module.exports = function ({GetAllWords, AddWord, EditWord, DeleteWord }) {
  router.get("/get-all", GetAllWords);
  router.post("/add", AddWord);
  router.post("/edit", EditWord);
  router.delete("/delete", DeleteWord);

  return router;
};
