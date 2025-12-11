from flask import Flask
from flask_cors import CORS
from datetime import timedelta
import os

def create_app():
    app = Flask(__name__)
    # In production load from env var. For local dev this is fine.
    app.secret_key = os.environ.get("FLASK_SECRET_KEY", "supersecretkey")

    # Session / cookie config
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    # For local dev w/ proxy 'Lax' works well.
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    # If using https in production, set SESSION_COOKIE_SECURE = True

    # Allow credentials and explicitly whitelist React origin.
    # Add origins you use in dev if not using proxy (http://localhost:3000 is common).
    CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

    from app.routes import bp
    app.register_blueprint(bp, url_prefix='/api')

    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)

    return app
