module.exports = function(userId, exerciseParams){
    let {wordTypes, notebooks} = exerciseParams;
    
    let resultQuery = `SELECT * FROM Word WHERE CreatorID = ${userId}`

    notebooks ? resultQuery += ` AND NotebookID IN (${notebooks.toString()})` : null
    wordTypes ? resultQuery += ` AND WordType IN (${wordTypes.toString()})` : null

    return resultQuery
}