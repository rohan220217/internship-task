import pandas as pd
from pymongo import MongoClient

client = MongoClient()
db = client["alchemy-group"] # client.database_name
collection = db["analytics"] #db.collection_name


def csv_to_json(filename, header=None):
    data = pd.read_csv(filename, header=header)
    return data.to_dict('records')

collection.insert_many(csv_to_json('AdSchema.csv',header=0))
