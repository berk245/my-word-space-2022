import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  if (!userId) {
    return (
      <div>
        <h1>Please login in to view this page</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Login page
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-main">
      <div className="welcome-text">
        <p>Welcome {username}</p>
      </div>
      <div className="links">
        <button>
          <Link to={"/exercise"}>Exercise</Link>
        </button>
        <button>
          <Link to={"/word"}>word</Link>
        </button>
        <button>
          <Link to={"/notebooks"}>notebook</Link>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
