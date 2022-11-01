module.exports = async function(database, {exerciseId, exerciseData}){
    
    let correctCount = 0
    exerciseData.map(async (exerciseWord, index) => {
        if(exerciseWord.userAnswer === exerciseWord.WordTranslation) correctCount += 1;
        await database.updateWordStats(exerciseWord)
    })

    await database.updateExerciseStatsAfterCompletion({exerciseId: exerciseId, correctCount: correctCount})
    return true
}
