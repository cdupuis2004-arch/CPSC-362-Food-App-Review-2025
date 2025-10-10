from flask import Blueprint, render_template, request
from app import reviews

# Create the blueprint for the routes
bp = Blueprint("blueprint", __name__)

# Renders index.html for the root url, http://127.0.0.1:5000/
@bp.route('/')
def root():
    return render_template('index.html'), 200

@bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    return reviews.get_reviews(), 200

@bp.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    reviews.add_review(data['username'], data['rating'], data['comment'])

    return {"message": "Review added successfully!"}, 201