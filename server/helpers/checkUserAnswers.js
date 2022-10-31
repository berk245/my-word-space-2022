module.exports = function(database, {exerciseId, exerciseData}){

    let correctCount = 0

    exerciseData.map(async (exerciseWord, index) => {
        let markedWord = {...exerciseWord, correct: 0}
        if(exerciseWord.userAnswer === exerciseWord.WordTranslation){
            correctCount++;
            markedWord.correct = 1
        }
        exerciseData[index] = markedWord
        await database.updateWordStats(markedWord)
    })

    return ({correctCount, exerciseData})
    
}