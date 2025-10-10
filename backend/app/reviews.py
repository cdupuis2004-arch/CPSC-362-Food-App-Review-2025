from app import collection

def get_reviews():
    reviews = []
    for review in collection.find():
        review['_id'] = str(review['_id'])
        reviews.append(review)

    return reviews

def add_review(username, rating, comment):
    review = {
        'username': username,
        'rating': rating,
        'comment': comment
    }
    collection.insert_one(review)