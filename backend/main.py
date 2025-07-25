from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from models.JobItem import JobItem
from config.database import get_database
from bson import ObjectId, errors
import re

app = FastAPI()

# CORS Middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # origine de ton frontend Vite
    allow_credentials=True,
    allow_methods=["*"],  # autorise GET, POST, etc.
    allow_headers=["*"],  # autorise tous les headers
)

@app.get("/jobs", response_model=List[JobItem])
def get_jobs(
    page: int = 1,
    limit: int = 10,
    location: Optional[str] = Query(None),
    contractType: Optional[str] = Query(None),
    experience: Optional[str] = Query(None)
):
    db = get_database()
    collection = db["jobs"]
    skip = (page - 1) * limit

    query = {}

    if location:
        query["location"] = {"$regex": re.escape(location), "$options": "i"}

    if contractType:
        query["contractType"] = {"$regex": re.escape(contractType), "$options": "i"}

    if experience:
        query["experience"] = {"$regex": re.escape(experience), "$options": "i"}

    jobs_cursor = collection.find(query).skip(skip).limit(limit)
    jobs_list = list(jobs_cursor)

    jobs = []
    for job in jobs_list:
        job["id"] = str(job.get("id") or job.get("_id", ObjectId()))
        jobs.append(JobItem(**job))

    return jobs

@app.get("/jobs/{job_id}", response_model=JobItem)
def get_job(job_id: str):
    db = get_database()
    collection = db["jobs"]

    try:
        obj_id = ObjectId(job_id)
    except errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID invalide (mauvais format)")

    job = collection.find_one({"_id": obj_id})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job["id"] = str(job["_id"])
    return JobItem(**job)
