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
    let user = await database.getUserByUserId(req.body.userId)
    if(!user) {
      res.status(400).json({error: 'User cannot be found'});
      return;
    }

    const addNotebookToDb = await database.addNewNotebook(req.body);

    addNotebookToDb.succes
      ? res.status(200).json({addNotebookSuccess: true })
      : res.status(500).json({ error: addNotebookToDb.error });
  };

  const editNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookId || !req.body.newNotebookName) {
      res.status(400).json(missingFieldsError);
      return;
    }
    //parse the request
    // pass it to the db function
    //return result
  };

  const deleteNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    //parse the request
    // pass it to the db function
    //return result
  };

  router.get("/get-all", getAllNotebooks);
  router.post("/add", addNewNotebook);
  router.post("/edit", editNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
