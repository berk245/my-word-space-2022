const getUser = require("../../helpers/getUser");
const Notebook = require("../../models/Notebook.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let { userId, notebookName } = req.body;

    let user = await getUser.byUserId(userId);
    if (!user) {
      res.status(400).json({ error: "User cannot be found" });
      return;
    }

    await Notebook.create({
      NotebookName: notebookName,
      CreatorID: userId,
    });
    res.status(200).json({ addNotebookSuccess: true });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /notebook/add",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};
