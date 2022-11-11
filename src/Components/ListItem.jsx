import React, { useState } from "react";
import {editNotebookName} from '../utils'

function ListItem({ content, userId, reload }) {
  const [editItem, setEditItem] = useState(false);
  const [fetchingData, setFetchingData] = useState(false)
  const [newNotebookName, setNewNotebookName] = useState(content.NotebookName)

  const submitUpdate = async() => {
    try{
        setFetchingData(true)
        let updateSuccess = await editNotebookName({userId: userId, notebookId: content.NotebookID, newNotebookName: newNotebookName})
        if(updateSuccess){
            
        }else{
            alert('Something went wrong with the update. Please try again.')
        }
    }catch(err){
        alert('Something went wrong with the update. Please try again.')
        console.log(err)
    }finally{
        setFetchingData(false)
        setEditItem(false)
        setNewNotebookName('')
        reload()
    }
    
  }



  if (editItem) {
    return (
      <div className="edit-form">
        <input onChange={(e)=>{setNewNotebookName(e.target.value)}} defaultValue={content.NotebookName}></input>
        <span>
          <button onClick={submitUpdate} disabled={fetchingData}>Submit</button>
          <button onClick={()=>setEditItem(false)}>Cancel</button>
        </span>
      </div>
    );
  } else {
    return (
      <div className="list-item">
        <span>{content.NotebookName}</span>
        <span>
          <button onClick={()=>setEditItem(true)}>Edit</button>
          <button>Delete</button>
        </span>
      </div>
    );
  }
}

export default ListItem;
