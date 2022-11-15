const Word = require('../models/Word.model')

module.exports = async ({ userId, exerciseParameters }) => {
    
    let {wordTypes, notebooks} = exerciseParameters;
    let queryObject = {
      CreatorID: userId
    }

    if(notebooks.length){
      queryObject = {
        ...queryObject,
        NotebookID: notebooks
      }
    }
    if(wordTypes.length){
      queryObject = {
        ...queryObject,
        WordType: wordTypes
      }
    }
    let wordpool = await Word.findAll(
      {
        where:{
          ...queryObject
        }
      }
    )
    return wordpool;
  };