const GetWord = require("./GetWord");
const db = require("../../config/database");

module.exports = async (req, res) => {
  try{
    if (!req.body.userId || !req.body.notebookId || !req.body.wordId) {
      res.status(400).json({ error: "Missing required fields" });
      return
    }
    let {wordId, notebookId, userId} = req.body;
    let word = await GetWord(wordId, notebookId, userId);
    if (!word) {
      res.status(400).json({ error: "Could not find the word" });
      return
    }

    await word.destroy(
      {
        where: {
          WordID: wordId,
          NotebookID: notebookId,
          CreatorID: userId,
        }
      }
    )
    res.status(200).json({ deleteWordSuccess: true });
  }catch(err){
    console.log(err);
    res.status(400).json({ error: err });
  }
};
