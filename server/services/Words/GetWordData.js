const Word = require("../../models/Word.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    const word = await Word.findOne({
      where: {
        WordID: req.params.wordId,
        CreatorID: req.userId,
      },
    });
    if (!word) {
      res.status(404).json({ error: "Could not find the word" });
      return;
    }
    res.status(200).json(word);
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /word/get",
      `Error details: ${err}`,
      `Request params: ${req.params}`
    );
    res.status(500).send("Server error");
  }
};
