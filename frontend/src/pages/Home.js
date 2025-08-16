import React from "react";

export default function Home() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        lineHeight: 1.6,
        padding: "0 20px",
      }}
    >
      
      <h1
        style={{
          textAlign: "center",
          color: "#1a1a1a",
          fontSize: "2.5rem",
          marginBottom: "20px",
        }}
      >
        Welcome to RizeOS
      </h1>

      
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <p style={{ fontSize: "1.1rem" }}>
          Our platform allows users to create and manage professional profiles, post and browse jobs,
          and leverage AI-powered features like skill extraction and job-candidate matching.
        </p>
      </div>

      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#1a1a1a", marginBottom: "10px" }}>Profile Management</h2>
          <p>
            Users can register, log in, edit their profiles, and update their skills or LinkedIn URL.
            Public wallet addresses can also be added for blockchain-related functionalities.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#1a1a1a", marginBottom: "10px" }}>Job Posting & Feed</h2>
          <p>
            Authenticated users can post jobs with details such as title, description, skills, and budget,
            browse job listings, filter by skill, location, or tags, and view posts from other users like career updates.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#1a1a1a", marginBottom: "10px" }}>AI Enhancements</h2>
          <p>
            AI-powered features include resume skill extraction, job-candidate matching with match scores,
            and smart suggestions for jobs and connections based on the user profile.
          </p>
        </div>
      </div>
    </div>
  );
}
