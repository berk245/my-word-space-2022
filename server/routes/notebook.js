const express = require("express");
const router = express.Router();
const AddNotebook = require('../services/Notebooks/AddNotebook')
const GetAllNotebooks = require('../services/Notebooks/GetAllNotebooks')
const EditNotebook = require('../services/Notebooks/EditNotebook')
const DeleteNotebook = require('../services/Notebooks/DeleteNotebook')

const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {



  router.get("/get-all", GetAllNotebooks);
  router.post("/add", AddNotebook);
  router.post("/update", EditNotebook);
  router.delete("/delete", DeleteNotebook);

  return router;
};
