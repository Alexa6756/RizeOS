import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/candidate/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      
      localStorage.setItem("token", data.access_token);

      
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Login
      </button>
    </div>
  );
}
