import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {editNotebookName} from '../utils'
import EditNotebookForm from './EditNotebookForm'
function ListItem({ content, userId, reload }) {
  const [editItem, setEditItem] = useState(false);
  const [fetchingData, setFetchingData] = useState(false)
  const [newNotebookName, setNewNotebookName] = useState(content.NotebookName)

  const navigate = useNavigate()

  if (editItem) return <EditNotebookForm content={content} reload={reload} userId={userId}/>
  else {
    return (
      <div className="list-item">
        <span>{content.NotebookName}</span>
        <span>
        <button onClick={()=>navigate(`/notebook/${content.NotebookID}`)} disabled={fetchingData}> > </button>
        </span>
      </div>
    );
  }
}

export default ListItem;
