import React, { useState } from "react";
import { getRecommendations } from "../api";

export default function RecommendationsList() {
  const [profile, setProfile] = useState("");
  const [jobs, setJobs] = useState([]);       
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecommend = async () => {
    if (!profile.trim()) {
      setError("Profile cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getRecommendations(profile);
      console.log("API Response:", data);                 
      setJobs(data.recommendations || []);               
    } catch (err) {
      console.error(err);
      setJobs([]);                                      
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Smart Job Recommendations</h2>
      <textarea
        placeholder="Your Profile"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />
      <button onClick={handleRecommend} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {jobs && jobs.length > 0 ? (
        <ul>
          {jobs.map((job, i) => (
            <li key={i}>
              {job.title} — {Number(job.score).toFixed(2)}%
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No recommendations yet.</p>
      )}
    </div>
  );
}
