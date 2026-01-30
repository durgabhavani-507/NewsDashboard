import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin({ setRole }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setRole("user");
    navigate("/user");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>User Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

// export default UserLogin;
