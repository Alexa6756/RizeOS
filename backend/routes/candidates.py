import os
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

from ..services.skill_extraction import extract_text_from_pdf, extract_skills
from backend.data.fake_db import candidates_db

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class CandidateRegister(BaseModel):
    name: str
    email: str
    password: str

class CandidateLogin(BaseModel):
    email: str
    password: str

class CandidateProfile(BaseModel):
    name: str
    bio: Optional[str] = ""
    linkedin_url: Optional[str] = ""
    skills: Optional[list] = []

class CandidateProfileUpdate(BaseModel):
    name: str
    bio: Optional[str] = ""
    linkedin_url: Optional[str] = ""
    skills: Optional[list] = []

class Token(BaseModel):
    access_token: str
    token_type: str


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_candidate(email: str):
    return candidates_db.get(email)


@router.post("/register/")
def register(candidate: CandidateRegister):
    if candidate.email in candidates_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pwd = hash_password(candidate.password)
    candidates_db[candidate.email] = {
        "name": candidate.name,
        "email": candidate.email,
        "password": hashed_pwd,
        "bio": "",
        "linkedin_url": "",
        "skills": []
    }
    return {"message": "Registration successful"}

@router.post("/login/", response_model=Token)
def login(candidate: CandidateLogin):
    db_candidate = get_candidate(candidate.email)
    if not db_candidate or not verify_password(candidate.password, db_candidate["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": candidate.email})
    return {"access_token": access_token, "token_type": "bearer"}

from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="candidates/login/")

def get_current_candidate(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        candidate = get_candidate(email)
        if candidate is None:
            raise HTTPException(status_code=401, detail="Candidate not found")
        return candidate
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/profile/", response_model=CandidateProfile)
def read_profile(current_candidate: dict = Depends(get_current_candidate)):
    return CandidateProfile(
        name=current_candidate["name"],
        bio=current_candidate.get("bio", ""),
        linkedin_url=current_candidate.get("linkedin_url", ""),
        skills=current_candidate.get("skills", [])
    )

@router.put("/profile/update/", response_model=CandidateProfileUpdate)
def update_profile(updated: CandidateProfileUpdate, current_candidate: dict = Depends(get_current_candidate)):
    email = current_candidate["email"]
    if email not in candidates_db:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidates_db[email]["name"] = updated.name
    candidates_db[email]["bio"] = updated.bio
    candidates_db[email]["linkedin_url"] = updated.linkedin_url
    candidates_db[email]["skills"] = updated.skills
    
    return candidates_db[email]

@router.post("/extract-skills/")
async def extract_resume_skills(file: UploadFile = File(...)):
    contents = await file.read()
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as f:
        f.write(contents)
    text = extract_text_from_pdf(temp_file)
    skills = extract_skills(text)
    return {"skills": skills}
