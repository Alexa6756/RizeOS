from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from backend.routes import candidates, jobs, recommendations

app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(candidates.router, prefix="/candidate", tags=["Candidate"])
app.include_router(jobs.router, prefix="/job", tags=["Job"])
app.include_router(recommendations.router, prefix="/recommend", tags=["Recommendations"])
