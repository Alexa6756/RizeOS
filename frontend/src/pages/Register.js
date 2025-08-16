import React, { useState } from "react";

export default function Register({ onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/candidate/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");

      
      if (typeof onRegisterSuccess === "function") {
        onRegisterSuccess();
      } else {
        
        window.location.href = "/login";
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleRegister} style={{ padding: "10px 20px" }}>
        Register
      </button>
    </div>
  );
}
