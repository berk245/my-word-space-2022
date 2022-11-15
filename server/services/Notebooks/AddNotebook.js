const GetUser = require("../../helpers/GetUser");
const Notebook = require("../../models/Notebook.model");
module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let { userId, notebookName } = req.body;

    let user = await GetUser.byUserId(userId);
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
    console.log(err);
    res.status(500).json({ error: err });
  }
};
