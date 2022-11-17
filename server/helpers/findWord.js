const Word = require("../models/Word.model");
const CloudWatch = require('../config/logger')
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
    CloudWatch.log("error", `Error in findWord.js:${err}`, `wordId: ${wordId}`, `userId: ${userId}`)
    return false
  }
}