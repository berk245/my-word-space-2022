import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotebooksList from "../Hooks/useNotebooksList";
import AddNewNotebook from '../Components/AddNewNotebook'
import NotebooksList from '../Components/NotebooksList'
import { isUserAuthenticated } from "../utils";
function Notebooks() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));
  const [addNotebookForm, setAddnotebookForm] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
  }, []);

  const { userNotebooks, fetchingData, fetchError } = useNotebooksList(
    userId,
    reloadList
  );
  if (!username || !userId) navigate("/not-authorized");

  const closeAddNewForm = () => {
    setAddnotebookForm(false);
    setReloadList(!reloadList)

  };
  return (
    <div>
      <button onClick={()=>navigate('/')}> Go back </button>
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
                  {addNotebookForm && <AddNewNotebook userId={userId} close={closeAddNewForm} />}
                </div>
                <NotebooksList userId={userId} userNotebooks={userNotebooks} reload={()=> setReloadList(!reloadList)}/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notebooks;
