from flask import Blueprint, render_template

# Create the blueprint for the routes
bp = Blueprint("blueprint", __name__)

# Renders index.html for the root url, http://127.0.0.1:5000/
@bp.route('/')
def root():
    return render_template('index.html'), 200