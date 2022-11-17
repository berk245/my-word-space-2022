const findNotebook = require("../../helpers/findNotebook");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId || !req.body.newNotebookName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let notebook = await findNotebook(req.body.userId, req.body.notebookId);
    if (!notebook) {
      res.status(400).json({ error: "Could not find the notebook" });
      return;
    }

    notebook.update(
      {
        NotebookName: req.body.newNotebookName,
      },
      {
        where: {
          notebookID: req.body.notebookId,
        },
      }
    );
    res.status(200).json({ updateNotebookSuccess: true });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /notebook/edit",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};
