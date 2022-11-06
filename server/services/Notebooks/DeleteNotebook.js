const db = require("../../config/database");
const GetNotebook = require("./GetNotebook");
module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let notebook = await GetNotebook(req.body.userId, req.body.notebookId);
    if (!notebook){
      res.status(400).json({ error: "Could not find the notebook" });
      return;
    }

    await db.execute(`DELETE FROM notebook  WHERE (NotebookID = ?)`, [
      req.body.notebookId,
    ]);
    res.status(200).json({ deleteNotebookSuccess: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
