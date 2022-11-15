const findNotebook = require("../../helpers/findNotebook");
const deleteWordsWithinNotebook = require("../../helpers/deleteWordsWithinNotebook");
module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let notebook = await findNotebook(req.body.userId, req.body.notebookId);
    if (!notebook) {
      res.status(400).json({ error: "Could not find the notebook" });
      return;
    }

    await deleteWordsWithinNotebook(req.body.notebookId);

    await notebook.destroy({
      where: {
        NotebookID: req.body.notebookId,
        CreatorID: req.body.userId,
      },
    });
    res.status(200).json({ deleteNotebookSuccess: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
