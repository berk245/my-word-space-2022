import React, { useState } from "react";
import { parseIdFromURL } from "../utils";
import useWordData from "../Hooks/useWordData";
import { deleteWord } from "../utils";
function Word() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));
  const wordId = parseIdFromURL(window.location);
  const [showEditWordForm, setShowEditWordForm] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const { fetchingData, fetchError, wordData } = useWordData(wordId);

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
  if (showEditWordForm)
    return (
      <div>
        <h1>Word</h1>
        <p> Word:</p> <input type="text" defaultValue={wordData.WordOriginal} />
        <p> Translation:</p>{" "}
        <input type="text" defaultValue={wordData.WordOriginal} />
        <br />
        <br />
        <button>Submit</button>
        <button onClick={() => setShowEditWordForm(false)}>Cancel</button>
      </div>
    );

  return (
    <div>
      <h1>Word</h1>
      <span>
        <button onClick={() => setShowEditWordForm(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </span>
      <p> Word: {wordData.WordOriginal}</p>
      <p> Translation: {wordData.WordOriginal}</p>
    </div>
  );
}

export default Word;
