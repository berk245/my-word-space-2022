const findWord = require("../../helpers/findWord");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.notebookId || !req.body.wordId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { wordId, notebookId, userId } = req.body;
    let word = await findWord(wordId, userId, notebookId);
    if (!word) {
      res.status(404).json({ error: "Could not find the word" });
      return;
    }

    await word.destroy({
      where: {
        WordID: wordId,
        NotebookID: notebookId,
        CreatorID: userId,
      },
    });
    res.status(200).json({ deleteWordSuccess: true });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /word/delete",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};
