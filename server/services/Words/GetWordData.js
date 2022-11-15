const Word = require("../../models/Word.model");
module.exports = async (req, res) => {
  try {
    const word = await Word.findOne({
      where: {
        WordID: req.params.wordId
      }
    })


    res.status(200).json(word);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
