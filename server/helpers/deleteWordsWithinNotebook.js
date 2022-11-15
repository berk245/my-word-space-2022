const Word = require("../models/Word.model")

module.exports = async(notebookId) => {
    //Delete associated words
    const notebookWords = await Word.findAll({
        where:{
          NotebookID: notebookId
        }
      })
  
      notebookWords.map(async(word)=>{
        word.destroy({
          where:{
            NotebookID: notebookId
          }
        })
      })
      return
}