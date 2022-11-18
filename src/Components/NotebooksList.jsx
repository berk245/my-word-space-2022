import React from "react";
import ListItem from "./ListItem";
function NotebooksList({ userNotebooks, userId, reload }) {
  if (!userNotebooks.length) return <p>You don't have any notebooks</p>;
  return (
    <div className="questions-box">
      {userNotebooks.map((notebook, idx) => {
        return (
          <ListItem
            key={idx}
            userId={userId}
            reload={reload}
            content={notebook}
          />
        );
      })}
    </div>
  );
}

export default NotebooksList;
