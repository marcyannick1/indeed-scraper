from dotenv import load_dotenv
import os
import pymongo
from pymongo.errors import DuplicateKeyError

load_dotenv()

class MongoDBPipeline:
    def open_spider(self, spider):
        mongo_uri = os.getenv("MONGO_URI")
        mongo_db = os.getenv("MONGO_DATABASE")
        self.client = pymongo.MongoClient(mongo_uri)
        self.db = self.client[mongo_db]
        self.collection = self.db["jobs"]
        self.collection.create_index("url", unique=True)

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        try:
            self.collection.insert_one(dict(item))
        except DuplicateKeyError:
            spider.logger.info(f"Offre déjà présente : {item['url']}")
        return item