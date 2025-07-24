

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.database import get_database

def save_jobs(jobs_data):
    db = get_database()
    collection = db["jobs"]

    if isinstance(jobs_data, dict):
        title = jobs_data.get("title")
        data_to_insert = jobs_data
    else:
        title = getattr(jobs_data, "title", None)
        data_to_insert = jobs_data.dict() if hasattr(jobs_data, "dict") else vars(jobs_data)

    if not collection.find_one({"title": title}):
        collection.insert_one(data_to_insert)
        print(f"Annonce sauvegardé : {title}")
    else:
        print(f"Annonce déjà présent : {title}")
