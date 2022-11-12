import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from './ListItem'
function NotebooksList({ userNotebooks, userId, reload }) {

return(
  <div className="view-list">
    {userNotebooks.length ? (
      <>
        {userNotebooks.map((notebook, idx) => {
          return <ListItem key={idx} userId={userId} reload={reload} content={notebook} />;
        })}
      </>
    ) : (
      <p>You don't have any notebooks</p>
    )}
  </div>
      )
    }



export default NotebooksList;
