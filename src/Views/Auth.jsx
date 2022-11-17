import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, isUserAuthenticated } from "../utils";
import "./Auth.css";

function Auth() {
  const [activeForm, setActiveForm] = useState("login");
  const [userData, setUserData] = useState();
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    setAuthError("");
    let newObj = { ...userData };
    newObj[e.target.name] = e.target.value;
    setUserData(newObj);
  };

  useEffect(() => {
    if (isUserAuthenticated()) navigate("/dashboard");
  }, []);

  const submitForm = async () => {
    if (activeForm == "login") {
      let loginData = await loginUser(userData);
      if (!loginData) {
        alert(
          "Could not log you in. Please make sure username and password is correct and try again."
        );
        return;
      }
      navigate("/dashboard");
    } else {
      if (userData.password != userData.passwordRepeat) {
        alert("Please make sure the passwords match");
        return false;
      }
      let signupRequest = await signupUser(userData);

      if (signupRequest.signupSuccess) {
        alert("Signup successful. Please login with your credentials");
        setActiveForm("login");
      } else {
        let errorText = "";
        if (signupRequest.existingUsernameError)
          errorText = "Username already exists.";
        if (signupRequest.existingEmailError)
          errorText += " Email is already taken.";

        setAuthError(errorText);
      }
      return;
    }
  };
  return (
    <div className="view-main">
      <h1>Welcome to the app</h1>
      <div className="auth-form">
        <input
          onChange={(e) => onChange(e)}
          type="text"
          className="text-input"
          name="username"
          id="username"
          placeholder="username"
        />
        {activeForm === "signup" && (
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="text-input"
            placeholder="Email address"
            name="email"
            id="email"
          />
        )}
        <input
          onChange={(e) => onChange(e)}
          type="password"
          name="password"
          className="text-input"
          id="password"
          placeholder="password"
        />
        {activeForm === "signup" && (
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className="text-input"
            placeholder="Repeat password"
            name="passwordRepeat"
            id="passwordRepeat"
          />
        )}
        {activeForm === "login" ? (
          <p>Don't have an account? <a className='auth-link' onClick={() => setActiveForm("signup")}>Signup</a></p>
        ) : (
          <a className='auth-link' onClick={() => setActiveForm("login")}>Back to login form</a>
        )}

        {authError && <p> Errors: {authError}</p>}
        <button className='btn action-button' onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
}

export default Auth;
