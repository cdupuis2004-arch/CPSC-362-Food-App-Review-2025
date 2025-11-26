from flask import Flask
from flask_cors import CORS

# Initializes the Flask app and sets up routing
def create_app():
    app = Flask(__name__)

    # Lets the frontend talk to this backend even though they run on different ports.
    CORS(app)

    from app.routes import bp
    app.register_blueprint(bp)

    return app