import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {isUserAuthenticated, logoutUser} from '../utils'
function Dashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUserId(userInfo.userId)
      setUsername(userInfo.username)
    }
  }, []);
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
      <button onClick={()=> logoutUser(navigate)}>Sign out</button>
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
