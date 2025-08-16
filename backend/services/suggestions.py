from ..utils.embeddings import get_embedding, cosine_similarity
import numpy as np

def recommend_jobs(user_profile: str, job_list: list, top_k=5):
    user_emb = get_embedding(user_profile)
    scores = []
    for job in job_list:
        job_emb = get_embedding(job['description'])
        score = cosine_similarity([user_emb], [job_emb])[0][0]
        scores.append({'job_title': job['title'], 'score': float(score)})

    
    scores.sort(key=lambda x: x['score'], reverse=True)
    for item in scores:
        item['score'] = round(item['score']*100, 2)
    return scores[:top_k]
