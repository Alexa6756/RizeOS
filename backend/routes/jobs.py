from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from backend.routes.candidates import get_current_candidate
from backend.data.jobs_db import jobs_db, save_jobs_db
from backend.services.matching import match_job_candidate

router = APIRouter()


class JobPost(BaseModel):
    title: str
    description: str
    skills: Optional[List[str]] = []
    salary: Optional[str] = None
    posted_by: Optional[str] = None

class JobMatchRequest(BaseModel):
    job_description: str
    candidate_bio: str


@router.post("/create/")
def create_job(job: JobPost, current_candidate: dict = Depends(get_current_candidate)):
    job_id = len(jobs_db) + 1
    jobs_db[job_id] = {
        "id": job_id,
        "title": job.title,
        "description": job.description,
        "skills": job.skills,
        "salary": job.salary,
        "posted_by": current_candidate["email"]
    }
    return {"message": "Job posted successfully", "job_id": job_id}

@router.get("/list/", response_model=List[JobPost])
def list_jobs(current_candidate: dict = Depends(get_current_candidate)):
    return [job for job in jobs_db.values()]


@router.post("/match/")
def match_job(request: JobMatchRequest):
    """
    Matches a candidate with a job description and returns a match score.
    Expects JSON body:
    {
        "job_description": "Job details here",
        "candidate_bio": "Candidate bio here"
    }
    """
    score = match_job_candidate(request.job_description, request.candidate_bio)
    return {"match_score": score}
