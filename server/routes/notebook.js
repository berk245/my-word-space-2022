const express = require("express");
const router = express.Router();
const AddNotebook = require('../services/Notebooks/AddNotebook')
const GetAllNotebooks = require('../services/Notebooks/GetAllNotebooks')
const EditNotebook = require('../services/Notebooks/EditNotebook')
const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {

  const deleteNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    
    let deleteNotebook = await database.deleteNotebook(req.body);

    deleteNotebook.success
      ? res.status(200).json({ deleteNotebookSuccess: true })
      : res.status(400).json({ error: deleteNotebook.error });
  };

  router.get("/get-all", GetAllNotebooks);
  router.post("/add", AddNotebook);
  router.post("/update", EditNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
