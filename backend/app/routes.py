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
    filters = {}

    store = request.args.get("store")
    name = request.args.get("name")

    if store:
        filters["store"] = store
        print(filters)

    if name:
        filters["name"] = name

    if filters:
        return jsonify(mongo.get_reviews(filters)), 200
    return jsonify(mongo.get_reviews()), 200

@bp.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()

    store = data['store'].strip().lower()
    username = data['name'].strip().lower()
    comment = data['comment'].strip().lower()
    rating = int(data['rating']) # Covert ratings to int

    if store and username and comment:
        result = mongo.add_review(store, username, comment, rating)
        return result, 201
    return {'message': 'Missing data'}, 400