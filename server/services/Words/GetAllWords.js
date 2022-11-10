const Word = require("../../models/Word.model");

module.exports = async (req, res) => {
  try {
    if(!req.body.userId){
      res.status(400).json({ error: 'Missing required fields' });
      return
    } 
    let words = await Word.findAll({
      where: {
        CreatorID: req.body.userId,
      },
    });
    res.status(200).json({ words: words });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
