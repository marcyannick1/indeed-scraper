from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from models.JobItem import JobItem
from config.database import get_database
from bson import ObjectId, errors
import re

app = FastAPI()

# CORS Middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Modèle de réponse avec pagination
class PaginatedJobsResponse(BaseModel):
    jobs: List[JobItem]
    total: int
    page: int
    limit: int
    total_pages: int


# Nouveau endpoint avec pagination complète
@app.get("/jobs", response_model=PaginatedJobsResponse)
def get_jobs(
        page: int = Query(1, ge=1, description="Numéro de page"),
        limit: int = Query(12, ge=1, le=50, description="Nombre d'éléments par page"),
        location: Optional[str] = Query(None, description="Filtrer par localisation"),
        contractType: Optional[str] = Query(None, description="Filtrer par type de contrat"),
        experience: Optional[str] = Query(None, description="Filtrer par expérience")
):
    db = get_database()
    collection = db["jobs"]

    # Construire la query
    query = {}

    if location:
        query["location"] = {"$regex": re.escape(location), "$options": "i"}

    if contractType:
        query["contractType"] = {"$regex": re.escape(contractType), "$options": "i"}

    if experience:
        query["experience"] = {"$regex": re.escape(experience), "$options": "i"}

    # Calculer le skip
    skip = (page - 1) * limit

    try:
        # Compter le total d'offres correspondant aux critères
        total_count = collection.count_documents(query)

        # Récupérer les offres paginées
        jobs_cursor = collection.find(query).skip(skip).limit(limit)
        jobs_list = list(jobs_cursor)

        # Formater les jobs
        jobs = []
        for job in jobs_list:
            job["id"] = str(job.get("id") or job.get("_id", ObjectId()))
            jobs.append(JobItem(**job))

        # Calculer le nombre total de pages
        total_pages = (total_count + limit - 1) // limit  # Équivalent à math.ceil(total_count / limit)

        return PaginatedJobsResponse(
            jobs=jobs,
            total=total_count,
            page=page,
            limit=limit,
            total_pages=total_pages
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des jobs: {str(e)}")


# Endpoint pour récupérer les statistiques globales (optionnel)
@app.get("/jobs/stats")
def get_jobs_stats():
    db = get_database()
    collection = db["jobs"]

    try:
        # Statistiques par type de contrat
        contract_stats = list(collection.aggregate([
            {"$group": {"_id": "$contractType", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]))

        # Statistiques par localisation (top 10)
        location_stats = list(collection.aggregate([
            {"$group": {"_id": "$location", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]))

        # Statistiques par expérience
        experience_stats = list(collection.aggregate([
            {"$group": {"_id": "$experience", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]))

        # Total des offres
        total_jobs = collection.count_documents({})

        return {
            "total_jobs": total_jobs,
            "contract_types": contract_stats,
            "top_locations": location_stats,
            "experience_levels": experience_stats
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des statistiques: {str(e)}")


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