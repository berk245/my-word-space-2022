import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {editNotebookName} from '../utils'
import {createNotebook} from '../utils'

function AddNewNotebook({ userId, reload, close }) {
  const [newNotebookName, setNewNotebookName] = useState("");
  const addNewNotebook = async() => {
    let createSuccess = await createNotebook({newNotebookName, userId})
    if(createSuccess) {
      close()
    }else{
      alert('Something went wrong while creating a new notebook.')
    }
  }

return(
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
          <button onClick={close}>Cancel</button>
        </div>
      )
    }



export default AddNewNotebook;
