from flask import Blueprint, jsonify, request
from bson import ObjectId
import re

import app.mongo as mongo


# Simple profanity list; block submissions containing any of these whole words
PROFANITY = {
    "fuck", "shit", "bitch", "asshole", "bastard", "dick", "piss", "crap",
}


def contains_profanity(text: str) -> bool:
    """Check if text contains any blocked words (case-insensitive, whole words)."""
    lowered = text.lower()
    return any(re.search(rf"\b{re.escape(word)}\b", lowered) for word in PROFANITY)

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.get('/')
def root_api():
    return {'message': 'Welcome to the api'}, 200

@bp.get('/reviews')
def get_reviews():
    return jsonify(mongo.get_reviews()), 200

@bp.post('/reviews')
def add_review():
    data = request.get_json() or {}

    store = data.get('store')
    username = data.get('name')
    comment = data.get('comment')
    rating = data.get('rating')

    # Basic field validation
    if not all([store, username, comment, rating]):
        return {'message': 'Missing data'}, 400

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return {'message': 'Invalid rating'}, 400

    if rating < 1 or rating > 5:
        return {'message': 'Rating must be between 1 and 5'}, 400

    # Profanity check (block submission)
    if contains_profanity(username) or contains_profanity(comment):
        return {'message': 'Review rejected for inappropriate language.'}, 400

    result = mongo.add_review(store, username, comment, rating)
    return result, 201


@bp.patch('/reviews/<review_id>')
def update_review(review_id: str):
    data = request.get_json() or {}

    store = data.get('store')
    username = data.get('name')
    comment = data.get('comment')
    rating = data.get('rating')

    # Basic field validation
    if not all([store, username, comment, rating]):
        return {'message': 'Missing data'}, 400

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return {'message': 'Invalid rating'}, 400

    if rating < 1 or rating > 5:
        return {'message': 'Rating must be between 1 and 5'}, 400

    # Profanity check (block submission)
    if contains_profanity(username) or contains_profanity(comment):
        return {'message': 'Review rejected for inappropriate language.'}, 400

    try:
        _id = ObjectId(review_id)
    except Exception:
        return {'message': 'Invalid review id'}, 400

    updated = mongo.update_review(_id, store, username, comment, rating)
    if not updated:
        return {'message': 'Review not found'}, 404

    return {'status': 'success'}, 200


@bp.delete('/reviews/<review_id>')
def delete_review(review_id: str):
    try:
        _id = ObjectId(review_id)
    except Exception:
        return {'message': 'Invalid review id'}, 400

    deleted = mongo.delete_review(_id)
    if not deleted:
        return {'message': 'Review not found'}, 404

    return {'status': 'deleted'}, 200
