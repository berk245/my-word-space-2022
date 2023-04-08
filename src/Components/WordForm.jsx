import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWord, editWord } from "../utils";
import useNotebooksList from "../Hooks/useNotebooksList";

function WordForm({
  type,
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
    notebookId: notebookId,
    wordId: wordId,
  });

  const navigate = useNavigate()

  const { userNotebooks, fetchingData, fetchError } = useNotebooksList();

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
      alert("Something went wrong. Please try again.");
      return;
    }
  };

  if (fetchingData) return <p>Loading</p>;
  if (!userNotebooks.length)
    return (
      <p>
        You do not have any notebooks yet. To add a word, please first{" "}
        <a className='auth-link' onClick={() => navigate("/notebooks")}> create a notebook </a>.
      </p>
    );
  return (
    <div className="add-new-word-form">
      <div className="form-title">
        {type == 'addNew' ?
        'Add a new word'
        :
       ' Edit Word'
      }
        </div>
      <div className="add-new-word-form-input-section">
        <div className="label-input-pair">
          <span>Original: </span>
          <input
            onChange={(e) => updateFields(e)}
            type="text"
            name="wordOriginal"
            id="wordOriginal"
            className="number-input add-word-form-input"
            defaultValue={newWord.wordOriginal}
            placeholder="Word Original"
          />
        </div>
        <div className="label-input-pair">
          <span>Translation: </span>
          <input
            onChange={(e) => updateFields(e)}
            type="text"
            name="wordTranslation"
            id="wordTranslation"
            className="number-input add-word-form-input"
            defaultValue={newWord.wordTranslation}
            placeholder="Word Translation"
          />
        </div>
        <div className="label-input-pair">
          <span>Notebook: </span>
          <select
            name="notebookId"
            id="notebookId"
            className="add-new-word-select"
            defaultValue={notebookId}
            onChange={(e) => updateFields(e)}
          >
            <option value="">-</option>
            {userNotebooks.map((notebook, idx) => {
              return (
                <option value={notebook.NotebookID} key={idx}>
                  {" "}
                  {notebook.NotebookName} ({notebook.NotebookID})
                </option>
              );
            })}
          </select>
        </div>

        <div className="label-input-pair">
          <span>Word Type: </span>
          <select
            defaultValue={newWord.wordType}
            name="wordType"
            className="add-new-word-select"
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
        </div>
        <div className="form-submit-buttons">
          <button
            className="btn go-back-button form-submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button className="btn go-back-button" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordForm;
