import React, { useState } from "react";
import { extractSkills } from "../api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    const data = await extractSkills(file);
    setSkills(data.skills);
  };

  return (
    <div>
      <h2>Resume Skill Extraction</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Extract Skills</button>
      {skills.length > 0 && (
        <ul>{skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      )}
    </div>
  );
}
