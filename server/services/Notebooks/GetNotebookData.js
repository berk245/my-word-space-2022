const Notebook = require("../../models/Notebook.model");
const Word = require("../../models/Word.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    const notebookInfo = await Notebook.findOne({
      where: {
        NotebookID: req.params.notebookId,
        CreatorID: req.userId
      },
    });

    if(!notebookInfo){
      res.status(404).json({error: 'Could not find notebook'})
      return
    }

    const notebookWords = await Word.findAll({
      where: {
        NotebookID: req.params.notebookId,
        CreatorID: req.userId
      },
    });

    res
      .status(200)
      .json({ notebookInfo: notebookInfo, notebookWords: notebookWords });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /notebook/get-data",
      `Error details: ${err}`,
      `Request params: ${req.params}`
    );
    res.status(500).send("Server error");
  }
};
