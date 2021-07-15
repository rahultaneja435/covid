import React, { useEffect, useState } from "react";
import result from "./firebase";
import App from "./App";
import "./login.css";
import logo from "../src/microsoftteams-image-1.jpeg";
function Authentication() {
  const [user, setUsers] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasaccount, sethasAccount] = useState(false);

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearAllErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    clearAllErrors();
    result
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-Disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };
  const handleSignup = () => {
    result
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };
  const logout = () => {
    result.auth().signOut();
  };

  const handleInputs = () => {
    result.auth().onAuthStateChanged((users) => {
      if (users) {
        resetInputs();
        setUsers(users);
      } else {
        setUsers("");
      }
    });
  };

  useEffect(() => {
    handleInputs();
  }, []);
  return (
    <div>
        <section className="login">
          <div className="loginContainer">
            <img src={logo}></img>
            <label>UserId</label>
            <input
              type="text"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="errorMessage">{emailError}</p>
            <label>password</label>
            <input
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errorMessage">{passwordError}</p>
            <div className="btnContainer">
              {hasaccount ? (
                <>
                  <button onClick={handleLogin}>Log In</button>
                  <p>
                    dont have an account?{" "}
                    <span onClick={() => sethasAccount(!hasaccount)}>
                      Sign Up
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button onClick={handleSignup}>Sign Up</button>
                  <p>
                    Already have an account?{" "}
                    <span onClick={() => sethasAccount(!hasaccount)}>
                      Log In
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
    </div>
  );
}

export default Authentication;
