const Word = require("../../models/Word.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if(!req.params.userId){
      res.status(400).json({ error: 'Missing required fields' });
      return
    } 
    let words = await Word.findAll({
      where: {
        CreatorID: req.params.userId,
      },
    });
    res.status(200).json({ words: words });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /word/get-all",
      `Error details: ${err}`,
      `Request params: ${req.params}`
    );
    res.status(500).send("Server error");
  }
};
