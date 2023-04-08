import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function ListItemWord({ content, reload }) {
  const navigate = useNavigate();

  return (
    <div className="word-list-line">
        <span className="word-list-cell">{content.WordOriginal}</span>
        <span className="word-list-cell">{content.WordTranslation}</span>
        <span className="word-list-cell">{content.NotebookID}</span>
        <span>
          <button className='btn go-back-button' onClick={() => navigate(`/word/${content.WordID}`)}>
            Details
          </button>
        </span>
    </div>
  );
}

export default ListItemWord;
