import React, { useState } from "react";
import { matchJob } from "../api";

export default function MatchScoreDisplay() {
  const [jobDesc, setJobDesc] = useState("");
  const [candidateBio, setCandidateBio] = useState("");
  const [score, setScore] = useState(null);

  const handleMatch = async () => {
    const data = await matchJob(jobDesc, candidateBio);
    setScore(data.match_score); 
  };

  return (
    <div>
      <h2>Job ↔ Applicant Matching</h2>
      <textarea
        placeholder="Job Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <textarea
        placeholder="Candidate Bio"
        value={candidateBio}
        onChange={(e) => setCandidateBio(e.target.value)}
      />
      <button onClick={handleMatch}>Get Match Score</button>
      {score !== null && (
        <h3>Match Score: {Number(score).toFixed(2)}%</h3>
      )}
    </div>
  );
}
