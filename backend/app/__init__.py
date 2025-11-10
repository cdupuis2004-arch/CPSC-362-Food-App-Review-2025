from flask import Flask

# Initializes the Flask app and sets up routing
def create_app():
    app = Flask(__name__)

    from app.routes import bp
    app.register_blueprint(bp)

    return app