import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import EditNotebookForm from './EditNotebookForm'
function ListItemWord({ content, userId, reload }) {


  console.log(content);

  const navigate = useNavigate()

  const submitUpdate = async() => {
  }
  // if (editItem) return <p>Edit word form</p>

    return (
      <div className="list-item">
          <li>{content.WordOriginal}</li>
      </div>
    );
  }

export default ListItemWord;
