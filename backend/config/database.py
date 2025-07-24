from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

CLUSTER_URL = os.getenv("MONGO_URI")
MONGO_DATABASE = os.getenv("MONGO_DATABASE")

# Connexion à la base de données
def get_database():
    client = MongoClient(CLUSTER_URL)
    db = client[MONGO_DATABASE]
    return db

if __name__ == "__main__":
    db = get_database()
    print("Connexion réussie à la base de données MongoDB !")
