import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


DB_FILE = BASE_DIR / "jobs_db.json"


if DB_FILE.exists():
    with open(DB_FILE, "r") as f:
        jobs_db = {int(k): v for k, v in json.load(f).items()}
else:
    
    jobs_db = {}
    with open(DB_FILE, "w") as f:
        json.dump({}, f, indent=2)

def save_jobs_db():
    with open(DB_FILE, "w") as f:
        json.dump({str(k): v for k, v in jobs_db.items()}, f, indent=2)
