const express = require("express");
const router = express.Router();

const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
  const getAllnotebooks = async (req, res) => {
    if (!req.body.userId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    const notebooks = await database.getUsernNotebooks(req.body.userId);
    res.status(200).json(notebooks);
  };

  const addNewNotebook = async (req, res) => {
    if (!req.body.userId || !req.body.notebookName) {
        res.status(400).json(missingFieldsError);
        return;
      }
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

  router.get("/get-all", getAllnotebooks);
  router.post("/add", addNewNotebook);
  router.post("/edit", editNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
