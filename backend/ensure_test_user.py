# ensure_test_user.py
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

# Same URI as mongo.py
uri = "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client['reviews']
users_collection = db['users']

username = "testuser"
password = "password123"
hashed_password = generate_password_hash(password)

# Upsert user
result = users_collection.update_one(
    {"username": username},
    {"$set": {"password_hash": hashed_password, "email": "testuser@example.com"}},
    upsert=True
)

print(f"Matched count: {result.matched_count}, Modified count: {result.modified_count}")

# Verify
user = users_collection.find_one({"username": username})
print(user)
