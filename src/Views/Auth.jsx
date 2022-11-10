import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from '../utils'
function Auth() {
  const [activeForm, setActiveForm] = useState("login");
  const [userData, setUserData] = useState();
    const navigate = useNavigate()
  const onChange = (e) => {
    let newObj = {...userData}
    newObj[e.target.name] = e.target.value;
    setUserData(newObj)
  };

  const submitForm = async() => {
    if (activeForm == "login") {
        let loginData = await loginUser(userData)
        if(!loginData){
            alert('Could noit log you in. Please make sure username and password is correct and try again.')
            return
        }
        localStorage.setItem('auth-token', loginData.accessToken)
        localStorage.setItem('userId', loginData.userId)
        navigate('/dashboard')


    } else {
        if(userData.password != userData.passwordRepeat){
            alert('Make sure the passwords match')
            return false
        }
    }
  };
  return (
    <div>
      <h1>Welcome to the app</h1>
      <div className="auth-form">
        <input
            onChange={(e)=>onChange(e)}
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        {activeForm === "signup" && (
          <input
            onChange={(e)=>onChange(e)}
            type="email"
            placeholder="Email address"
            name="email"
            id="email"
          />
        )}
        <input
            onChange={(e)=>onChange(e)}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        {activeForm === "signup" && (
          <input
            onChange={(e)=>onChange(e)}
            type="password"
            placeholder="Repeat password"
            name="passwordRepeat"
            id="passwordRepeat"
          />
        )}
        {activeForm === "login" ? (
          <a onClick={() => setActiveForm("signup")}>Signup</a>
        ) : (
          <a onClick={() => setActiveForm("login")}>Back to login form</a>
        )}
        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
}

export default Auth;
