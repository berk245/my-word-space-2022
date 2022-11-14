import React, {useState} from 'react'
import {completeExercise} from '../utils'

function CurrentExercise({userId, exerciseData, setExerciseResults, setCurrentView}) {
    const exerciseId = exerciseData.exerciseId
    const [exerciseQuestions, setExerciseQuestions] = useState(exerciseData.exerciseQuestions)
    const [resultsError, setResultsError] = useState(false)
    const updateAnswer = (answer, questionIndex) => {
        let newObj = [...exerciseQuestions]
        newObj[questionIndex].userAnswer = answer
        setExerciseQuestions(newObj)
    }

    const submitExercise = async() => {
        let postObj = {userId: userId, exerciseId: exerciseId, exerciseData: exerciseQuestions}
        
        let completeRequest = await completeExercise(postObj)

        if(completeRequest.error){
            setResultsError('Could not complete exercise. Please check your internet connection and try again.')
            return
        }

        setExerciseResults(exerciseQuestions)
        setCurrentView('postExercise')
    }

    const goBack = () => {
        let confirmed = window.confirm('This will end the exercise. Are you sure?')
        if(!confirmed) return
        
        setCurrentView('preExercise')
    }   


    return (
    <div>
        <button onClick={goBack}>Go back</button>
        <h2>Exercise</h2>
        {resultsError && <p>{resultsError}</p>}
        {exerciseQuestions.map((question, index) => {
            return(
                <div key={index} className="">
                    <span>{question.WordOriginal}</span>
                    <input type="text" onChange={(e) => updateAnswer(e.target.value, index)}/>
                </div>
            )
        })}
        <button onClick={submitExercise}>Submit</button>
    </div>
  )
}

export default CurrentExercise;