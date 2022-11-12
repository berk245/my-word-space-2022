import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItemWord from './ListItemWord'
function WordsList({ notebookWords, userId, reload }) {

return(
  <div className="view-list">
  <h4>Words in this notebook</h4>
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
