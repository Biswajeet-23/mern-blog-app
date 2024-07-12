import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.4:4000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 201) alert("registeration successful");
    else alert("registeration failed");
  };

  const handleUsername = (e) => setUsername(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <form className="register" onSubmit={handleRegister}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
};

export default Register;
