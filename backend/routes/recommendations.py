from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.recommendation import recommend_jobs

router = APIRouter()

class RecommendationRequest(BaseModel):
    candidate_bio: str
    top_n: int = 5

@router.post("/jobs/")
def get_job_recommendations(request: RecommendationRequest):
    if not request.candidate_bio.strip():
        raise HTTPException(status_code=400, detail="Candidate bio cannot be empty")
    
    recommendations = recommend_jobs(request.candidate_bio, request.top_n)
    
    
    return {"recommendations": recommendations or []}
