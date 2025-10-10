from flask import Flask
from pymongo import MongoClient

uri = "mongodb+srv://CasualCaleb:GDD8tvad5u95UvDD@cluster0.sifoxlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)
collection = client['reviews']['collection']

# Initializes the Flask app and sets up routing
def create_app():
    app = Flask(__name__)

    from app.routes import bp
    app.register_blueprint(bp)

    return app