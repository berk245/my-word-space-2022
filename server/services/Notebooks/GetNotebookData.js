const Notebook = require("../../models/Notebook.model");
const Word = require("../../models/Word.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    const notebookInfo = await Notebook.findOne({
      where: {
        NotebookID: req.params.notebookId
      },
    });

    const notebookWords = await Word.findAll({
      where: {
        NotebookID: req.params.notebookId
      }
    })


    res.status(200).json({ notebookInfo: notebookInfo, notebookWords: notebookWords });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /notebook/get-notebook-data",
      `Error details: ${err}`,
      `Request params: ${req.params}`
    );
    res.status(500).send("Server error");
  }
};
