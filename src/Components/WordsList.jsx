import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordForm from "./WordForm";
import ListItemWord from './ListItemWord'

function WordsList({ notebookWords, notebookId, userId, reload }) {
const [showAddNewWordForm, setShowAddNewWordForm] = useState(false)
return(
  <div className="view-list">
  <h4>Words in this notebook</h4>
  {!showAddNewWordForm &&  <button onClick={()=> setShowAddNewWordForm(true)}>Add Word</button>}
  {showAddNewWordForm && <WordForm type='addNew' notebookId={notebookId} userId={userId} reload={reload} close={()=>setShowAddNewWordForm(false)}/>}
    {notebookWords.length ? (
      <>
        {notebookWords.map((word, idx) => {
          return <ListItemWord key={idx} userId={userId} reload={reload} content={word} />;
        })}
      </>
    ) : (
      <p>You don't have any words in this notebook</p>
    )}
  </div>
      )
    }



export default WordsList;
