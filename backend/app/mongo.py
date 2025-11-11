from pymongo import MongoClient

uri = "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
collection = client['reviews']['collection']

def get_reviews():
    data = collection.find()
    reviews = []

    for review in data:
        review['_id'] = str(review['_id'])
        reviews.append(review)
    return reviews

def add_review(name, comment):
    data = {
        'name': name,
        'comment': comment
    }
    result = collection.insert_one(data)
    if result.inserted_id:
        return {'status': 'success'}
    return {'status': 'mongo error'}