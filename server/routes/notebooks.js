const express = require("express");
const router = express.Router();

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

  const addNewNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookName) {
      res.status(400).json(missingFieldsError);
      return;
    }
    let user = await database.getUserByUserId(req.body.userId);
    if (!user) {
      res.status(400).json({ error: "User cannot be found" });
      return;
    }

    const addNotebookToDb = await database.addNewNotebook(req.body);

    addNotebookToDb.succes
      ? res.status(200).json({ addNotebookSuccess: true })
      : res.status(500).json({ error: addNotebookToDb.error });
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
  router.post("/add", addNewNotebook);
  router.post("/update", editNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
