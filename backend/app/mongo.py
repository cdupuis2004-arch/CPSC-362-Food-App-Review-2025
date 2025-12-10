from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

# MongoDB connection
# IMPORTANT: Move this URI into env var for production.
uri = "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)

# Default database and collections
db = client['reviews']
reviews_collection = db['collection']
users_collection = db['users']

# ---------- Review Functions ----------
def get_reviews(filters=None):
    """Return list of reviews. Convert ObjectId to str for JSON transport."""
    query = filters or {}
    # If _id passed in filters as string, convert to ObjectId
    if query.get('_id') and isinstance(query['_id'], str):
        try:
            query['_id'] = ObjectId(query['_id'])
        except Exception:
            # invalid id format -> no results
            return []

    data = reviews_collection.find(query)
    reviews = []
    for review in data:
        review['_id'] = str(review['_id'])
        reviews.append(review)
    return reviews

def add_review(store, username, comment, rating):
    """Add a review. rating must be 1..5. Stores 'username' as author."""
    if rating < 1 or rating > 5:
        return {'status': 'mongo.py rating error'}
    data = {
        'store': store,
        'username': username,   # author of review (consistent with session)
        'comment': comment,
        'rating': rating,
    }
    result = reviews_collection.insert_one(data)
    if result.inserted_id:
        return {'status': 'success', '_id': str(result.inserted_id)}
    return {'status': 'MongoDB internal error'}

def update_review(_id, store, username, comment, rating):
    """
    Update a review. _id may be string. This function does NOT check ownership;
    the route should verify session username matches review['username'] before calling.
    """
    try:
        obj_id = ObjectId(_id)
    except Exception:
        return False

    update = {
        '$set': {
            'store': store,
            'username': username,
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
