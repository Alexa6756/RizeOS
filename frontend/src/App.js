import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIDashboard from "./pages/AIDashboard"; 

export default function App() {
  return (
    <Router>
      
      <header style={{ padding: "15px 30px", backgroundColor: "#282c34", color: "#fff" }}>
        <h1 style={{ margin: 0, display: "inline-block" }}>RizeOS</h1>
        <nav style={{ display: "inline-block", marginLeft: "40px" }}>
          <Link to="/" style={{ color: "#61dafb", marginRight: "20px", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/register" style={{ color: "#61dafb", marginRight: "20px", textDecoration: "none" }}>
            Register
          </Link>
          <Link to="/login" style={{ color: "#61dafb", marginRight: "20px", textDecoration: "none" }}>
            Login
          </Link>
          <Link to="/dashboard" style={{ color: "#61dafb", marginRight: "20px", textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/ai-enhancements" style={{ color: "#61dafb", textDecoration: "none" }}>
            AI Enhancements
          </Link>
        </nav>
      </header>

      
      <main style={{ padding: "30px", minHeight: "80vh", fontFamily: "Arial, sans-serif" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-enhancements" element={<AIDashboard />} />
        </Routes>
      </main>

      
      <footer
        style={{
          padding: "15px 30px",
          backgroundColor: "#282c34",
          color: "#fff",
          textAlign: "center",
        }}
      >
        &copy; 2025 RizeOS | Powered by React & FastAPI
      </footer>
    </Router>
  );
}
