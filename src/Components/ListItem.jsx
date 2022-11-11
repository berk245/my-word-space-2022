import React from "react";

function ListItem({ content }) {
  return (
    <div className="list-item">
      <span>{content.NotebookName}</span>
      <span>
        <button>Edit</button>
        <button>Delete</button>
      </span>
    </div>
  );
}

export default ListItem;
