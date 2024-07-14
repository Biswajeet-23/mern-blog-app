import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context_api/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://127.0.0.4:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { username, userId } = data;
        setUserInfo({ id: userId, username: username });
        navigate("/");
      } else {
        alert("login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUsername = (e) => setUsername(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <form className="login" onSubmit={handleRegister}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={handleUsername}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePassword}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
