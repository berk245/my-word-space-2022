import React from "react";
import { useNavigate } from "react-router-dom";
import {isUserAuthenticated} from '../utils'
function PostExercise({ exerciseResults }) {
  const navigate = useNavigate()
  if(!isUserAuthenticated()){
    navigate('/not-authorized')
  }
  return (
    <div>
      <h2>Exercise Review</h2>
      {exerciseResults.map((result, idx) => {
        return(
            
        <ul key ={idx} className="" >
            <span>Question:</span>
            <span>{result.WordOriginal}</span>
            <span>Your Answer:</span>
            <span>{result.userAnswer}</span>
            <span>Correct Answer:</span>
            <span>{result.WordTranslation}</span>
            {result.WordTranslation === result.userAnswer ? 
                <span>Correct!</span>
                :
                <span>Wrong answer</span>
        }
        </ul>
        
        )
      })}
      <button onClick={()=>navigate('/')}>Done</button>
    </div>
  );
}

export default PostExercise;
