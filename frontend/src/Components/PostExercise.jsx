import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils";
function PostExercise({ exerciseResults }) {
  const navigate = useNavigate();
  if (!isUserAuthenticated()) {
    navigate("/not-authorized");
  }
  return (
    <div>
      <h2>Exercise Review</h2>
      <div className="questions-box">
        <div className="result-headers">
          <span className='result-header'>Question</span>
          <span className='result-header'>Your Answer</span>
          <span className='result-header'>Correct Answer</span>
        </div>
        {exerciseResults.map((result, idx) => {
          return (
            <div key={idx} className={result.WordTranslation === result.userAnswer ? "result-line correct-result" : "result-line wrong-result"}>
              <span className='result-text'>{result.WordOriginal}</span>
              <span className='result-text'>{result.userAnswer}</span>
              <span className='result-text'>{result.WordTranslation}</span>
            </div>
          );
        })}
      </div>

      <button className='btn centered-button' onClick={() => navigate("/")}>Done</button>
    </div>
  );
}

export default PostExercise;
