import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    linkedin_url: "",
    skills: []
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://rize-os-navy.vercel.app/candidate/profile/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to fetch profile");
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await fetch("https://rize-os-navy.vercel.app/candidate/profile/update/", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to update profile");
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>My Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <label>Name:</label>
      <input
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        disabled={!editMode}
      />
      
      <label>Bio:</label>
      <textarea
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        disabled={!editMode}
      />

      <label>LinkedIn URL:</label>
      <input
        value={profile.linkedin_url}
        onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
        disabled={!editMode}
      />

      <label>Skills (comma-separated):</label>
      <input
        value={profile.skills.join(", ")}
        onChange={(e) =>
          setProfile({ ...profile, skills: e.target.value.split(",").map(s => s.trim()) })
        }
        disabled={!editMode}
      />

      {!editMode ? (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      ) : (
        <button onClick={handleSave}>Save Profile</button>
      )}
    </div>
  );
}
