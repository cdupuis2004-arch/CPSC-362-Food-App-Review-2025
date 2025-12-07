from app import create_app

# Start the app from here
if __name__ == "__main__":
    app = create_app()
    app.run()

    # Use this for hosting
    #app.run('0.0.0.0', 5000)