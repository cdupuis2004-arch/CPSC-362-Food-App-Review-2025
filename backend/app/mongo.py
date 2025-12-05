from pymongo import MongoClient

uri = "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
collection = client['reviews']['collection']

def get_reviews(filters=None):
    query = filters or {}
    data = collection.find(query)

    reviews = []
    for review in data:
        review['_id'] = str(review['_id'])
        reviews.append(review)

    return reviews

def add_review(store, username, comment, rating):
    # Make sure rating is between 1 and 5
    if rating < 1 or rating > 5:
        return {'status': 'mongo.py rating error'}

    data = {
        'store': store,
        'name': username,
        'comment': comment,
        'rating': rating,
    }
    result = collection.insert_one(data)
    if result.inserted_id:
        return {'status': 'success'}
    return {'status': 'MongoDB internal error'}


def update_review(_id, store, username, comment, rating):
    update = {
        '$set': {
            'store': store,
            'name': username,
            'comment': comment,
            'rating': rating,
        }
    }
    res = collection.update_one({'_id': _id}, update)
    return res.modified_count > 0


def delete_review(_id):
    res = collection.delete_one({'_id': _id})
    return res.deleted_count > 0