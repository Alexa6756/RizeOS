import pdfplumber
from ..utils.preprocessing import clean_text


SKILLS = [
    'python', 'java', 'sql', 'react', 'node', 'c++', 'machine learning',
    'deep learning', 'nlp', 'data analysis', 'aws', 'docker'
]

def extract_text_from_pdf(file_path):
    text = ''
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + ' '
    return text

def extract_skills(text):
    text = clean_text(text)
    found_skills = [skill for skill in SKILLS if skill in text]
    return found_skills

