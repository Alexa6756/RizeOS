import React from "react";
import ResumeUpload from "../components/ResumeUpload";
import MatchScoreDisplay from "../components/MatchScoreDisplay";
import RecommendationsList from "../components/RecommendationsList";

export default function AiEnhancements() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>AI Enhancements Dashboard</h2>

      <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <ResumeUpload />
      </section>

      <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <MatchScoreDisplay />
      </section>

      <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <RecommendationsList />
      </section>
    </div>
  );
}
