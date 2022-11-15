const express = require("express");
const router = express.Router();
const AddNotebook = require("../services/Notebooks/AddNotebook");
const DeleteNotebook = require("../services/Notebooks/DeleteNotebook");
const EditNotebook = require("../services/Notebooks/EditNotebook");
const GetAllNotebooks = require("../services/Notebooks/GetAllNotebooks");
const GetNotebookData = require("../services/Notebooks/GetNotebookData");

module.exports = function () {
  router.get("/get-all/:userId", GetAllNotebooks);
  router.get("/get-notebook-data/:notebookId", GetNotebookData);
  router.post("/add", AddNotebook);
  router.post("/edit", EditNotebook);
  router.delete("/delete", DeleteNotebook);

  return router;
};
