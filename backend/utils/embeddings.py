from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str):
    return model.encode(text)

def similarity(vec1, vec2):
    return cosine_similarity([vec1], [vec2])[0][0]
