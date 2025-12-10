from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os

# MongoDB connection - move URI to env var for production
uri = os.environ.get("MONGO_URI", "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = MongoClient(uri)

# Default database and collections
db = client['reviews']
reviews_collection = db['collection']
users_collection = db['users']

# ---------- Review Functions ----------
def get_reviews(filters=None):
    """Return list of reviews. Convert ObjectId to str for JSON transport."""
    query = filters.copy() if filters else {}

    # If asking by _id string, convert to ObjectId
    if query.get('_id') and isinstance(query['_id'], str):
        try:
            query['_id'] = ObjectId(query['_id'])
        except Exception:
            # invalid id => no results
            return []

    cursor = reviews_collection.find(query).sort([('_id', -1)])  # newest first
    reviews = []
    for r in cursor:
        r['_id'] = str(r['_id'])
        reviews.append(r)
    return reviews

def add_review(store, username, display_name, comment, rating):
    """Add a review. Stores 'username' as author and 'display_name' as public name."""
    if rating is None or rating < 1 or rating > 5:
        return {'status': 'mongo.py rating error'}
    data = {
        'store': store,
        'username': username,        # owner (for permission checks)
        'display_name': display_name, # public display name (editable per-review)
        'comment': comment,
        'rating': rating,
    }
    result = reviews_collection.insert_one(data)
    if result.inserted_id:
        return {'status': 'success', '_id': str(result.inserted_id)}
    return {'status': 'MongoDB internal error'}

def update_review(_id, store, username, display_name, comment, rating):
    """
    Update a review. Expects _id (string). Ownership checks should be done in route.
    """
    try:
        obj_id = ObjectId(_id)
    except Exception:
        return False

    update = {
        '$set': {
            'store': store,
            'username': username,  # keep owner username (shouldn't change)
            'display_name': display_name,
            'comment': comment,
            'rating': rating,
        }
    }
    res = reviews_collection.update_one({'_id': obj_id}, update)
    return res.modified_count > 0

def delete_review(_id):
    """Delete review by string id."""
    try:
        obj_id = ObjectId(_id)
    except Exception:
        return False
    res = reviews_collection.delete_one({'_id': obj_id})
    return res.deleted_count > 0

def get_store_ratings():
    """Returns a dictionary mapping store names to their average rating."""
    pipeline = [
        {
            "$group": {
                "_id": "$store",
                "average": {"$avg": "$rating"}
            }
        }
    ]
    results = reviews_collection.aggregate(pipeline)
    
    ratings_map = {}
    for doc in results:
        if doc["_id"]:
            ratings_map[doc["_id"]] = doc["average"]
            
    return ratings_map

# ---------- User Functions ----------
def get_user_by_username(username: str):
    """Return user document or None. Note: password stored hashed in 'password_hash'."""
    return users_collection.find_one({"username": username})

def add_user(username: str, email: str, password: str):
    """Hashes password before storing. Returns inserted_id or None."""
    if get_user_by_username(username):
        return None  # user already exists
    password_hash = generate_password_hash(password)
    result = users_collection.insert_one({
        "username": username,
        "email": email,
        "password_hash": password_hash
    })
    return result.inserted_id
