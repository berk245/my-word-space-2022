import React, { useState } from "react";
import { parseIdFromURL } from "../utils";
import useWordData from "../Hooks/useWordData";
import { deleteWord } from "../utils";
import WordForm from "../Components/WordForm";
function Word() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));
  const wordId = parseIdFromURL(window.location);
  const [showEditWordForm, setShowEditWordForm] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [refetchData, setRefetchData] = useState(false);

  const { fetchingData, fetchError, wordData } = useWordData(
    wordId,
    refetchData
  );

  const handleDelete = async () => {
    let confirmed = window.confirm(
      "Are you sure you want to delete this word?"
    );
    if (!confirmed) return;
    let deleteSuccess = await deleteWord({
      wordId,
      userId,
      notebookId: wordData.NotebookID,
    });
    if (!deleteSuccess) {
      alert("Something went wrong. Please try again");
    } else {
      setServerMessage(
        "Word succesfully deleted. You are being redirected to the previous page."
      );
      setTimeout(() => {
        window.history.back();
      }, 1500);
    }
  };

  if (serverMessage) return <p>{serverMessage}</p>;
  if (fetchingData) return <p>Loading</p>;

  return (
    <div>
      <button onClick={() => window.history.back()}>Go back</button>
      <h1>Word</h1>
      {showEditWordForm ? (
        <WordForm
          type="edit"
          wordId= {wordId}
          userId={userId}
          notebookId={wordData.NotebookID}
          wordOriginal={wordData.WordOriginal}
          wordTranslation={wordData.WordTranslation}
          wordType={wordData.WordType}
          close={() => setShowEditWordForm(false)}
          reload={() => setRefetchData(!refetchData)}
        />
      ) : (
        <>
          <span>
            <button onClick={() => setShowEditWordForm(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </span>
          <p> Word: {wordData.WordOriginal}</p>
          <p> Translation: {wordData.WordTranslation}</p>
        </>
      )}
    </div>
  );
}

export default Word;
