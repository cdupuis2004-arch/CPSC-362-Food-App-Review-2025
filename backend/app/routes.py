from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from app import mongo  # import your mongo.py functions

bp = Blueprint('api', __name__)

# ---------- Authentication Endpoints ----------
@bp.route('/me', methods=['GET'])
def me():
    """Return currently logged-in user (username and email)."""
    username = session.get('username')
    if username:
        user = mongo.get_user_by_username(username)
        email = user.get('email') if user else None
        return jsonify({"username": username, "email": email}), 200
    return jsonify({"username": None}), 200

@bp.route('/login', methods=['POST'])
def login():
    """Logs in a user and stores their username in the session."""
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    user = mongo.get_user_by_username(username)
    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({"message": "Invalid credentials"}), 401

    session['username'] = username
    session.permanent = True
    return jsonify({"username": username, "email": user.get('email')}), 200

@bp.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logged out"}), 200

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    if mongo.get_user_by_username(username):
        return jsonify({"message": "Username already exists"}), 400

    inserted = mongo.add_user(username, email, password)
    if not inserted:
        return jsonify({"message": "Failed to create user"}), 500

    session['username'] = username
    session.permanent = True
    return jsonify({"username": username, "email": email}), 201

# ---------- Reviews Endpoints ----------
@bp.route('/reviews', methods=['GET'])
def get_reviews():
    """Return reviews. Optional ?store=STORE to filter."""
    store = request.args.get('store')
    filters = {"store": store} if store else {}
    reviews = mongo.get_reviews(filters)
    return jsonify(reviews), 200

@bp.route('/reviews', methods=['POST'])
def add_review():
    """Create a review. Must be logged-in. Payload must include display_name, store, comment, rating."""
    if 'username' not in session:
        return jsonify({"message": "Login required"}), 403

    data = request.get_json() or {}
    display_name = data.get('display_name')
    store = data.get('store')
    comment = data.get('comment')
    rating = data.get('rating')

    if not display_name or not store or not comment or rating is None:
        return jsonify({"message": "display_name, store, comment, and rating are required"}), 400

    username = session['username']
    result = mongo.add_review(store=store, username=username, display_name=display_name, comment=comment, rating=rating)
    if result.get('status') == 'success':
        return jsonify(result), 201
    return jsonify(result), 500

@bp.route('/reviews/<_id>', methods=['PATCH'])
def update_review(_id):
    """Update review by id. Only owner (session username) may update."""
    if 'username' not in session:
        return jsonify({"message": "Login required"}), 403

    existing = mongo.get_reviews({"_id": _id})
    if not existing:
        return jsonify({"message": "Review not found"}), 404
    review = existing[0]

    if review.get('username') != session['username']:
        return jsonify({"message": "Not authorized to edit this review"}), 403

    data = request.get_json() or {}
    display_name = data.get('display_name', review.get('display_name'))
    store = data.get('store', review.get('store'))
    comment = data.get('comment', review.get('comment'))
    rating = data.get('rating', review.get('rating'))

    success = mongo.update_review(_id=_id, store=store, username=review.get('username'), display_name=display_name, comment=comment, rating=rating)
    if success:
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "fail"}), 400

@bp.route('/reviews/<_id>', methods=['DELETE'])
def delete_review(_id):
    """Delete review by id. Only owner may delete."""
    if 'username' not in session:
        return jsonify({"message": "Login required"}), 403

    existing = mongo.get_reviews({"_id": _id})
    if not existing:
        return jsonify({"message": "Review not found"}), 404
    review = existing[0]

    if review.get('username') != session['username']:
        return jsonify({"message": "Not authorized to delete this review"}), 403

    ok = mongo.delete_review(_id)
    if ok:
        return jsonify({"status": "deleted"}), 200
    return jsonify({"status": "fail"}), 500
