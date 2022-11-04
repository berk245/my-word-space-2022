const db = require("../../config/database");
const GetNotebook = require("./GetNotebook");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId || !req.body.newNotebookName) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let notebook = await GetNotebook(req.body.userId, req.body.notebookId);
    if (!notebook) {
      res.status(400).json({ error: "Could not find notebook" });
      return;
    }
    await db.execute(
      `UPDATE notebook SET NotebookName = ? WHERE (NotebookID = ?)`,
      [req.body.newNotebookName, req.body.notebookId]
    );
    res.status(200).json({ updateNotebookSuccess: true });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err });
  }
};
