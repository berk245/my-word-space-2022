const Word = require("../models/Word.model");

module.exports = async (wordId, userId) => {
  
  try {
    let word = await Word.findOne({
      where: {
        WordID: wordId,
        CreatorID: userId,
      },
    });
    return word
  } catch (err) {
    console.log(err)
    return false
  }
}