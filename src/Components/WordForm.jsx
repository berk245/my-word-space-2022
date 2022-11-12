import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWord, editWord } from "../utils";

function WordForm({
  type,
  userId,
  wordId = "",
  notebookId = "",
  reload,
  wordType = "",
  wordOriginal = "",
  wordTranslation = "",
  close,
}) {
  const [newWord, setNewWord] = useState({
    wordOriginal: wordOriginal,
    wordTranslation: wordTranslation,
    wordType: wordType,
    userId: userId,
    notebookId: notebookId,
    wordId: wordId,
  });

  const updateFields = (e) => {
    let updateObj = { ...newWord };
    updateObj[e.target.id] = e.target.value;
    setNewWord(updateObj);
  };

  const handleSubmit = async () => {
    let requestSuccess;
    if (type == "addNew") requestSuccess = await createWord(newWord);
    else requestSuccess = await editWord(newWord);

    if (requestSuccess) {
      reload();
      close();
    } else {
      alert("Something went wrong while creating a new notebook.");
      return
    }
  };

  return (
    <div className="add-new-form">
      <span>Original: </span>
      <input
        onChange={(e) => updateFields(e)}
        type="text"
        name="wordOriginal"
        id="wordOriginal"
        defaultValue={newWord.wordOriginal}
        placeholder="Word Original"
      />
      <span>Translation: </span>
      <input
        onChange={(e) => updateFields(e)}
        type="text"
        name="wordTranslation"
        id="wordTranslation"
        defaultValue={newWord.wordTranslation}
        placeholder="Word Translation"
      />
      <span>Notebook: </span>
      <select name="wordType" id="wordType" onChange={(e) => updateFields(e)}>
        <option value={notebookId} selected>
          {" "}
          {notebookId}
        </option>
      </select>
      <span>Word Type: </span>
      <select
        defaultValue={newWord.wordType}
        name="wordType"
        id="wordType"
        onChange={(e) => updateFields(e)}
      >
        <option value="" disabled>
          -
        </option>
        <option value="adjective">Adjective</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="other">other</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
}

export default WordForm;
