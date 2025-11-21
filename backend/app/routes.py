from flask import Blueprint, jsonify, request
import app.mongo as mongo

# Create the blueprint for the routes
bp = Blueprint("blueprint", __name__)

# Renders index.html for the root url, http://127.0.0.1:5000/
@bp.route('/')
def root():
    return {'message': 'Welcome to the root'}, 200

@bp.route('/api')
def root_api():
    return {'message': 'Welcome to the api'}, 200

@bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    return jsonify(mongo.get_reviews()), 200

@bp.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()

    store = data['store']
    username = data['name']
    comment = data['comment']
    rating = data['rating']

    if store and username and comment and rating:
        result = mongo.add_review(store, username, comment, rating)
        return result, 201
    return {'message': 'Missing data'}, 400