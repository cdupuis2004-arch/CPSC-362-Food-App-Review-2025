from flask import Blueprint, render_template, request
from app.models import Review
from app import db

# Create the blueprint for the routes
bp = Blueprint("blueprint", __name__)

# Renders index.html for the root url, http://127.0.0.1:5000/
@bp.route('/')
def root():
    return render_template('index.html'), 200

@bp.route('/api/review', methods=['POST'])
def review():
    data = request.get_json()

    new_review = Review(
        username = data['username'],
        rating = data['rating'],
        comment = data['comment']
    )

    db.session.add(new_review)
    db.session.commit()

    return {"message": "Review added successfully!"}, 201