import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils";

function PageHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={logoutUser(navigate)}>Sign out</button>
    </div>
  );
}

export default PageHeader;
