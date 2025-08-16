const BASE_URL = "http://127.0.0.1:8000";

export async function extractSkills(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/candidate/extract-skills/`, {
    method: "POST",
    body: formData
  });
  return res.json();
}

export async function matchJob(jobDescription, candidateBio) {
  const res = await fetch(`${BASE_URL}/job/match/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_description: jobDescription, candidate_bio: candidateBio })
  });
  return res.json();
}

export async function getRecommendations(candidateBio) {
  const res = await fetch(`${BASE_URL}/recommend/jobs/`, {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidate_bio: candidateBio })    
  });
  return res.json();
}
