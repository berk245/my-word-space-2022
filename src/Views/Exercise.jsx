import React, {useState} from 'react'
import useNotebooksList from '../Hooks/useNotebooksList'
import PreExercise from '../Components/PreExercise';
import CurrentExercise from '../Components/CurrentExercise';
function Exercise() {

  const { userId } = JSON.parse(localStorage.getItem("user"));
  const [currentView, setCurrentView] = useState('preExercise')
  const [exerciseData, setExerciseData] = useState({})
  const [exerciseResults, setExerciseResults] = useState({})
  const {userNotebooks, fetchError, fetchingData} = useNotebooksList(userId)
 
  if(fetchingData) return <p>Loading</p>
  return (
    <div>
      {currentView == 'preExercise' && <PreExercise userNotebooks={userNotebooks} userId={userId} setExerciseData={setExerciseData} setCurrentView={setCurrentView}/>}
      {currentView == 'exercise' && <CurrentExercise userId={userId} exerciseData={exerciseData} setExerciseResults={setExerciseResults} setCurrentView={setCurrentView}/>}
      {currentView == 'postExercise' && <p>Post Exercise</p>}

    </div>
  )
}

export default Exercise