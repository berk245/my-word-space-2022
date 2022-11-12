const Word = require("../models/Word.model");

module.exports = async (wordId, notebookId, userId) => {
  
  try {
    let word = await Word.findOne({
      where: {
        WordID: wordId,
        CreatorID: userId,
        NotebookID: notebookId,
      },
    });
    return word
  } catch (err) {
    console.log(err)
    return false
  }
}