import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {isUserAuthenticated} from '../utils'
function Dashboard() {
  const { username, userId } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if(!isUserAuthenticated()) navigate('/not-authorized')
  }, [])
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
          <Link to={"/words"}>Words</Link>
        </button>
        <button>
          <Link to={"/notebooks"}>Notebooks</Link>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
