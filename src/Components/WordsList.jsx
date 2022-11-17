import React from "react";
import ListItemWord from "./ListItemWord";
function WordsList({ wordList, notebookId = "", userId, reload }) {
  if (!wordList.length) return <p>No words to display</p>;
  return (
    <div className="all-words-box">
      <div className="word-list-headers">
        <span className="word-list-header">Original</span>
        <span className="word-list-header">Translation</span>
        <span className="word-list-header">Notebook</span>
      </div>
      <div className="">
        {wordList.map((word, idx) => {
          return (
            <ListItemWord
              key={idx}
              userId={userId}
              reload={reload}
              content={word}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WordsList;
