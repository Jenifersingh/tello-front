import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../service/api";

import styles from "./auth.module.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClick = () => {
    signUp({
      email: data.email,
      password: data.password,
    });
    navigate("/signin");
  };

  const handleChange = (changedData) => {
    setData({
      ...data,
      ...changedData,
    });
  };
  return (
    <div className={styles.authCont}>
      {/* <div> */}
      <div className={styles.signInHead}>SIGN UP</div>
      <div>
        <input
          onChange={(e) => handleChange({ email: e.target.value })}
          className={styles.inputBox}
          placeholder="Email"
          type="text"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleChange({ password: e.target.value })}
          className={styles.inputBox}
          placeholder="Password"
          type="password"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleChange({ confirmPassword: e.target.value })}
          className={styles.inputBox}
          placeholder="Confirm Password"
          type="password"
        />
      </div>
      <div>
        <button onClick={handleClick} className={styles.authButton}>
          Sign Up
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export const SignIn = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    signIn(data).then((data) => {
      localStorage.setItem("token", data.authToken);
    });
    navigate("/project");
  };

  const handleChange = (changedData) => {
    setData({
      ...data,
      ...changedData,
    });
  };

  return (
    <div className={styles.authCont}>
      {/* <div> */}
      <div className={styles.signInHead}>SIGN IN</div>
      <div>
        <input
          onChange={(e) => handleChange({ email: e.target.value })}
          className={styles.inputBox}
          placeholder="Email"
          type="text"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleChange({ password: e.target.value })}
          className={styles.inputBox}
          placeholder="Password"
          type="password"
        />
      </div>
      <div>
        <button onClick={handleClick} className={styles.authButton}>
          Sign In
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};
