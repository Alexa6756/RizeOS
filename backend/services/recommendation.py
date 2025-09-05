from backend.utils.embeddings import embed_text, similarity
from backend.data.jobs_db import jobs_db  

def recommend_jobs(candidate_bio: str, top_n: int = 5):
    candidate_vec = embed_text(candidate_bio)
    scores = []

    for job_id, job in jobs_db.items():
        job_vec = embed_text(job["description"])  
        score = similarity(candidate_vec, job_vec)
        scores.append((job, score))

    
    scores.sort(key=lambda x: x[1], reverse=True)
    top_jobs = [
        {"id": job["id"], "title": job["title"], "score": float(round(score * 100, 2))}
        for job, score in scores[:top_n]
    ]

    return top_jobs
