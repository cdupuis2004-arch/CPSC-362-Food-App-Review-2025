from app import create_app

# Start the app from here
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)  # turn on debug mode for automatic reload
