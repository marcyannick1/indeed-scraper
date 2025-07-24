import uuid
import json
from typing import List
from models.JobItem import JobItem
from models.Job import save_jobs

def load_jobs_from_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        jobs = []
        for item in data:
            item["skills"] = item.get("skills", [])
            jobs.append(JobItem(**item))
        return jobs

# Charger les offres
jobs: List[JobItem] = load_jobs_from_json("data/jobs.json")

# Sauvegarde dans Mongo
for job in jobs:
    save_jobs(job)
print("✅ Tous les jobs ont été insérés dans MongoDB.")
