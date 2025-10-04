from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Initializes the Flask app and sets up routing
def create_app():
    app = Flask(__name__)

    # App config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Init SQLAlchemy
    db.init_app(app)

    from app.routes import bp
    app.register_blueprint(bp)

    return app