from pymongo import MongoClient
from django.conf import settings

# Connessione a MongoDB
client = MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]

# Funzione per ottenere una collection specifica
def get_collection(collection_name):
    return db[collection_name]
