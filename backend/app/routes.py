from flask import Blueprint, jsonify, request
import app.mongo as mongo

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.get('/')
def root_api():
    return {'message': 'Welcome to the api'}, 200

@bp.get('/reviews')
def get_reviews():
    return jsonify(mongo.get_reviews()), 200

@bp.post('/reviews')
def add_review():
    data = request.get_json()

    store = data['store']
    username = data['name']
    comment = data['comment']
    rating = int(data['rating'])

    if store and username and comment:
        result = mongo.add_review(store, username, comment, rating)
        return result, 201
    
    return {'message': 'Missing data'}, 400
