import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function ListItemWord({ content, userId, reload }) {
  const navigate = useNavigate();

  return (
    <div className="list-item">
      <li>
        <span>Original: {content.WordOriginal}</span>
        <span>Translation: {content.WordTranslation}</span>
        <span>
          <button onClick={() => navigate(`/word/${content.WordID}`)}>
            {" "}
            >{" "}
          </button>
        </span>
      </li>
    </div>
  );
}

export default ListItemWord;
