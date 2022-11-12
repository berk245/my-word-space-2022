const Notebook = require("../../models/Notebook.model");

module.exports = async (userId, notebookId, request=false) => {
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
