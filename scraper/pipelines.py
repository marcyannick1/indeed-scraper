from dotenv import load_dotenv
import os
import pymongo
from pymongo.errors import DuplicateKeyError
import re
from datetime import datetime
from itemadapter import ItemAdapter

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


class ConvertPublishDatePipeline:
    def process_item(self, item, spider):
        publish_date = item.get("publishDate")

        if publish_date:
            try:
                item["publishDate"] = datetime.fromisoformat(publish_date)
            except ValueError:
                try:
                    item["publishDate"] = datetime.strptime(publish_date, "%d/%m/%Y")
                except Exception as e:
                    spider.logger.warning(f"Échec du parsing de la date: {publish_date} → {e}")
        return item


class CleanSelectedFieldsPipeline:
    FIELDS_TO_CLEAN = ['contractType', 'company']

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)

        # Nettoyage des champs simples
        for field in self.FIELDS_TO_CLEAN:
            if field in adapter:
                adapter[field] = self.clean_field(adapter[field])

        # Nettoyage des champs imbriqués dans companyInfo
        if 'companyInfo' in adapter and isinstance(adapter['companyInfo'], dict):
            for sub_field in ['size', 'description']:
                if sub_field in adapter['companyInfo']:
                    adapter['companyInfo'][sub_field] = self.clean_field(
                        adapter['companyInfo'][sub_field]
                    )

        return item

    def clean_field(self, value):
        if isinstance(value, str):
            return self.clean_text(value)
        elif isinstance(value, list):
            return [self.clean_text(v) for v in value if isinstance(v, str)]
        return value

    def clean_text(self, text):
        return re.sub(r'\s+', ' ', text.strip())
