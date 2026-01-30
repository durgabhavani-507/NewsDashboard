import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/images/default.png";


function Login({ setRole }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // await signInWithPopup(auth, provider);

    // TEMP role logic
    // setRole("user");
    // navigate("/user");


    await signInWithPopup(auth, provider);

// ✅ SAVE ROLE
setRole("user");
localStorage.setItem("role", "user");
navigate("/user");

  } catch (error) {
    alert(error.message);
  }
};

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful 🎉 Please sign in");
        setIsSignup(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);

      // TEMP role logic
      // if (email === "admin@gmail.com") {
      //   setRole("admin");
      //   navigate("/admin");
      // } else {
      //   setRole("user");
      //   navigate("/user");
      // }
      if (email === "admin@gmail.com") {
  setRole("admin");
  localStorage.setItem("role", "admin");
  navigate("/admin");
} else {
  setRole("user");
  localStorage.setItem("role", "user");
  navigate("/user");
}

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      {/* ===== TOP BAR ===== */}
      <div className="auth-top">
        <span className="brand">NewsHub</span>
        
       

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>

      {/* ===== CARD ===== */}
      <div className="login-card">
        {/* <div className="auth-icon">📰</div> */}
<div className="auth-logo">
  <img src={logo} alt="NewsHub Logo" />
</div>

        <h2>Welcome to NewsHub</h2>
        <p className="login-subtext">
          Sign in to personalize your news experience
        </p>

        {/* TOGGLE */}
        <div className="auth-toggle">
          <button
            className={!isSignup ? "active" : ""}
            onClick={() => setIsSignup(false)}
          >
            Sign In
          </button>
          <button
            className={isSignup ? "active" : ""}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
        </div>

        {/* INPUTS */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleAuth}>
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        <div className="divider">or continue with</div>

        <div className="social-btns">
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Google
          </button>
<button
  type="button"
  className="guest-btn"
  // onClick={() => {
  //   setRole("user");     // ✅ MUST be "user"
  //   navigate("/user");  // ✅ User Dashboard
  // }}
  onClick={() => {
  setRole("user");
  localStorage.setItem("role", "user");
  navigate("/user");
}}

>
  Guest Mode
</button>

        </div>
      </div>
    </div>
  );
}

export default Login;
