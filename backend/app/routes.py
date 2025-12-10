from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from app import mongo  # import your mongo.py functions

# Create a blueprint for all API routes
bp = Blueprint('api', __name__)

# ---------- Authentication Endpoints ----------
@bp.route('/me', methods=['GET'])
def me():
    """Returns the currently logged-in user (from session)."""
    username = session.get('username')
    if username:
        # optionally return email too if you want (query mongo)
        user = mongo.get_user_by_username(username)
        email = user.get('email') if user else None
        return jsonify({"username": username, "email": email})
    return jsonify({"username": None})

@bp.route('/login', methods=['POST'])
def login():
    """Logs in a user and stores their username in the session."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    # Fetch user from Mongo
    user = mongo.get_user_by_username(username)
    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Store username in session for authentication
    session['username'] = username
    session.permanent = True
    return jsonify({"username": username, "email": user.get('email')}), 200

@bp.route('/logout', methods=['POST'])
def logout():
    """Logs out the current user."""
    session.pop('username', None)
    return jsonify({"message": "Logged out"}), 200

@bp.route('/signup', methods=['POST'])
def signup():
    """Creates a new user account. Returns 201 on success and logs them in."""
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validation
    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user exists
    if mongo.get_user_by_username(username):
        return jsonify({"message": "Username already exists"}), 400

    # Add user
    inserted = mongo.add_user(username, email, password)
    if not inserted:
        return jsonify({"message": "Failed to create user"}), 500

    # Log them in immediately
    session['username'] = username
    session.permanent = True
    return jsonify({"username": username, "email": email}), 201

# ---------- Reviews Endpoints ----------
@bp.route('/reviews', methods=['GET'])
def get_reviews():
    """Returns all reviews, optionally filtered by store."""
    store = request.args.get('store')
    filters = {"store": store} if store else {}
    reviews = mongo.get_reviews(filters)
    return jsonify(reviews), 200

@bp.route('/reviews', methods=['POST'])
def add_review():
    """Adds a new review. User must be logged in. Author is session username."""
    if 'username' not in session:
        return jsonify({"message": "Login required"}), 403

    data = request.get_json() or {}
    store = data.get('store')
    comment = data.get('comment')
    rating = data.get('rating')

    if not store or not comment or rating is None:
        return jsonify({"message": "Store, comment and rating are required"}), 400

    username = session['username']
    result = mongo.add_review(
        store=store,
        username=username,
        comment=comment,
        rating=rating
    )
    return jsonify(result), 201 if result.get('status') == 'success' else 500

@bp.route('/reviews/<_id>', methods=['PATCH'])
def update_review(_id):
    """Updates a review by ID. User must be logged in and be the author."""
    if 'username' not in session:
        return jsonify({"message": "Login required"}), 403

    # Fetch existing review to verify ownership
    existing = mongo.get_reviews({"_id": _id})
    if not existing:
        return jsonify({"message": "Review not found"}), 404
    review = existing[0]
    if review.get('username') != session['username']:
        return jsonify({"message": "Not authorized to edit this review"}), 403

    data = request.get_json() or {}
    store = data.get('store', review.get('store'))
    comment = data.get('comment', review.get('comment'))
    rating = data.get('rating', review.get('rating'))

    success = mongo.update_review(
        _id=_id,
        store=store,
        username=session['username'],
        comment=comment,
        rating=rating
    )
    if success:
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "fail"}), 400

@bp.route('/reviews/<_id>', methods=['DELETE'])
def delete_review(_id):
    """Delete review by ID. Only the author may delete."""
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
