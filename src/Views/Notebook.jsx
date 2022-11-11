import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotebook from "../Hooks/useNotebook";
import ListItem from "../Components/ListItem";
import {createNotebook} from '../utils'
function Notebook() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));
  const [addNotebookForm, setAddnotebookForm] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState("");
  const [reloadList, setReloadList] = useState(false);
  const navigate = useNavigate();

  const { userNotebooks, fetchingData, fetchError } = useNotebook(
    userId,
    reloadList
  );
  if (!username || !userId) navigate("/not-authorized");

  const addNewNotebook = async() => {
    let createSuccess = await createNotebook({newNotebookName, userId})
    if(createSuccess) {
      closeAddNewForm()
      setReloadList(!reloadList)
    }else{
      alert('Something went wrong while creating a new notebook.')
      return
    }
  }

  const closeAddNewForm = () => {
    setNewNotebookName("");
    setAddnotebookForm(false);
  };
  return (
    <div>
      <h1>Notebooks</h1>
      <div className="view-main-content">
        {fetchingData ? (
          <p>Loading</p>
        ) : (
          <div className="page-content">
            {fetchError ? (
              <h4>There was an error accessing your notebooks.</h4>
            ) : (
              <div className="items-list">
                <div className="list-title">
                  <h3>Your Notebooks</h3>
                  {!addNotebookForm && (
                    <button onClick={() => setAddnotebookForm(true)}>
                      Add Notebook
                    </button>
                  )}
                  {addNotebookForm && (
                    <div className="add-new-form">
                      <input
                        onChange={(e) => setNewNotebookName(e.target.value)}
                        type="text"
                        name="notebook-name"
                        id="notebook-name"
                      />
                      <button onClick={() => addNewNotebook()}>
                        Submit
                      </button>
                      <button onClick={closeAddNewForm}>Cancel</button>
                    </div>
                  )}
                </div>
                <div className="view-list">
                  {userNotebooks.length ? (
                    <>
                      {userNotebooks.map((notebook, idx) => {
                        return <ListItem key={idx} userId={userId} reload={()=> setReloadList(!reloadList)} content={notebook} />;
                      })}
                    </>
                  ) : (
                    <p>You don't have any notebooks</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notebook;
