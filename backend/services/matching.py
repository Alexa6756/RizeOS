from backend.utils.embeddings import embed_text, similarity
from backend.utils.preprocessing import clean_text

def match_job_candidate(job_description: str, candidate_bio: str):
    
    job_clean = clean_text(job_description)
    candidate_clean = clean_text(candidate_bio)
    
    
    job_vec = embed_text(job_clean)
    candidate_vec = embed_text(candidate_clean)
    
    
    score = similarity(job_vec, candidate_vec)
    
    
    return round(float(score) * 100, 2)  
