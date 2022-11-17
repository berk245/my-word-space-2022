import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotebookInfo from "../Hooks/useNotebookInfo";
import { parseIdFromURL, deleteNotebook, isUserAuthenticated } from "../utils";
import EditNotebookForm from "../Components/EditNotebookForm";
import WordsList from "../Components/WordsList";

function Notebook() {
  const notebookId = parseIdFromURL(window.location);
  const [reloadList, setReloadList] = useState(false);
  const [showEditNotebookForm, setShowEditNotebookForm] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);

  const [userId, setUserId] = useState();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUserId(userInfo.userId);
      setUsername(userInfo.username);
    }
  }, []);
  const { notebookInfo, notebookWords, fetchingData, fetchError } =
    useNotebookInfo(notebookId, reloadList);
  if (!username || !userId) navigate("/not-authorized");

  const handleDelete = async () => {
    try {
      let deleteConfirmed = window.confirm(
        "Are you sure you want to delete this notebook?"
      );
      if (!deleteConfirmed) return;
      let deleteSuccess = await deleteNotebook({ userId, notebookId });
      if (deleteSuccess) {
        setServerMessage(
          "Delete successful. Redirecting you back to notebooks page."
        );
        setTimeout(() => {
          setServerMessage("");
          navigate("/notebooks");
        }, 1500);
      } else throw new Error();
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    }
  };
  if (fetchingData) return <p>Loading</p>;
  return (
    <>
      {serverMessage ? (
        <p>{serverMessage}</p>
      ) : (
        <div>
          <button onClick={() => navigate("/notebooks")}>Go back</button>
          <h1>{notebookInfo.NotebookName}</h1>
          <button onClick={() => setShowEditNotebookForm(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>

          {showEditNotebookForm && (
            <EditNotebookForm
              content={notebookInfo}
              userId={userId}
              close={() => setShowEditNotebookForm(false)}
              reload={() => setReloadList(!reloadList)}
            />
          )}
          <h4>Words in this notebook</h4>
          <WordsList
            wordList={notebookWords}
            notebookId={notebookId}
            userId={userId}
            reload={() => {
              setReloadList(!reloadList);
            }}
          />
        </div>
      )}
    </>
  );
}

export default Notebook;
