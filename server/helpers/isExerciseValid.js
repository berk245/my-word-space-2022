module.exports = async function(database, exerciseId){

    let isExercise = await database.findExercise(exerciseId)
    let isCompleted = await database.isExerciseComplete(exerciseId)

    return (isExercise && !isCompleted)
}