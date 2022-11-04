const express = require("express");
const router = express.Router();
const AddNotebook = require('../services/AddNotebook')
const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
  const getAllNotebooks = async (req, res) => {
    if (!req.body.userId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    const notebooks = await database.getUserNotebooks(req.body.userId);
    res.status(200).json({ notebooks: notebooks });
  };

  const editNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookId || !req.body.newNotebookName) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let updateNotebook = await database.updateNotebookName(req.body);

    updateNotebook.success
      ? res.status(200).json({ updateNotebookSuccess: true })
      : res.status(400).json({ error: updateNotebook.error });
  };

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

  router.get("/get-all", getAllNotebooks);
  router.post("/add", AddNotebook);
  router.post("/update", editNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
