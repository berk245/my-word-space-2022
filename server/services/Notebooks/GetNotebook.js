const db = require("../../config/database");

const Notebook = require("../../models/Notebook.model");

module.exports = async (userId, notebookId) => {
  try {
    let notebook = await Notebook.findOne({
      where: {
        CreatorID: userId,
        NotebookID: notebookId,
      },
    });
    return notebook;
  } catch (err) {
    return false;
  }
};
