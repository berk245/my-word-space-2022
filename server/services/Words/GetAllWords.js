const Word = require("../../models/Word.model");

module.exports = async (req, res) => {
  try {
    let words = await Word.findAll({
      where: {
        CreatorID: req.body.userId,
        Status: "active",
      },
    });
    console.log(words);
    res.status(200).json({ words: words });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
