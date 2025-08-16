import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", skills: "", budget: "" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", bio: "", linkedin_url: "", skills: "" });
  const [filters, setFilters] = useState({ skill: "", location: "", tag: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!token) navigate("/login");
    fetch("http://127.0.0.1:8000/candidate/profile/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setProfileForm({
          name: data.name,
          bio: data.bio,
          linkedin_url: data.linkedin_url,
          skills: data.skills.join(", ")
        });
      })
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  
  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:8000/job/list/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, [token]);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  
  const handlePostJob = () => {
    fetch("http://127.0.0.1:8000/job/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newJob, skills: newJob.skills.split(",").map(s => s.trim()) })
    })
      .then(res => res.json())
      .then(() => {
        setNewJob({ title: "", description: "", skills: "", budget: "" });
        return fetch("http://127.0.0.1:8000/job/list/", {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      });
  };

  
  const handleProfileUpdate = () => {
    fetch("http://127.0.0.1:8000/candidate/profile/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...profileForm,
        skills: profileForm.skills.split(",").map(s => s.trim())
      })
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEditingProfile(false);
      });
  };

  
  const handleFilter = () => {
    let filtered = [...jobs];
    if (filters.skill)
      filtered = filtered.filter(job => job.skills.includes(filters.skill.trim()));
    if (filters.location)
      filtered = filtered.filter(job => job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.tag)
      filtered = filtered.filter(job => job.tags && job.tags.includes(filters.tag.trim()));
    setFilteredJobs(filtered);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2>Welcome, {profile.name}</h2>

      
      {editingProfile ? (
        <div style={{ marginBottom: "20px" }}>
          <input placeholder="Name" value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} />
          <input placeholder="Bio" value={profileForm.bio} onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })} />
          <input placeholder="LinkedIn URL" value={profileForm.linkedin_url} onChange={e => setProfileForm({ ...profileForm, linkedin_url: e.target.value })} />
          <input placeholder="Skills (comma separated)" value={profileForm.skills} onChange={e => setProfileForm({ ...profileForm, skills: e.target.value })} />
          <button onClick={handleProfileUpdate}>Save Profile</button>
          <button onClick={() => setEditingProfile(false)} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p>Bio: {profile.bio}</p>
          <p>LinkedIn: {profile.linkedin_url}</p>
          <p>Skills: {profile.skills.join(", ")}</p>
          <button onClick={() => setEditingProfile(true)}>Edit / Update Profile</button>
        </div>
      )}

      <button onClick={() => navigate("/ai-enhancements")}>AI Enhancements</button>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>

      <hr />

      <h2>Post a Job</h2>
      <input placeholder="Title" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
      <input placeholder="Description" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} />
      <input placeholder="Skills (comma separated)" value={newJob.skills} onChange={e => setNewJob({ ...newJob, skills: e.target.value })} />
      <input placeholder="Salary" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} />
      <button onClick={handlePostJob}>Post Job</button>

      <hr />


      <h2>Jobs / Posts Available</h2>
      {filteredJobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Skills: {job.skills.join(", ")}</p>
          <p>Salary: {job.salary}</p>
          <p>Posted by: {job.posted_by}</p>
          {job.location && <p>Location: {job.location}</p>}
          {job.tags && <p>Tags: {job.tags.join(", ")}</p>}
        </div>
      ))}
    </div>
  );
}
