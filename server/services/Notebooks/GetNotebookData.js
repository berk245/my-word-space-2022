const Notebook = require("../../models/Notebook.model");
const Word = require("../../models/Word.model");
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
    console.log(err);
    res.status(500).json({ error: err });
  }
};
