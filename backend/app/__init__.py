from flask import Flask
from flask_cors import CORS
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    app.secret_key = "supersecretkey"  # keep this secret in env for production

    # Session / cookie config - tuned for local dev with proxy.
    # If you run frontend on a different origin without a proxy, you'll need to
    # configure cookies and TLS accordingly.
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    # For local dev with a proxy, 'Lax' works well. Do not set SameSite=None unless using Secure.
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    # Allow credentials and explicitly whitelist React origin.
    # If you use a proxy (recommended), the frontend will call relative /api endpoints.
    CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

    from app.routes import bp
    app.register_blueprint(bp, url_prefix='/api')

    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)

    return app
