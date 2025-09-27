from flask import Flask, render_template

app = Flask(__name__) #flask

# Handling of the root
@app.route("/")
def home():
    #   Render Chris's HTML file
    return render_template('chris_new_file.html')


# Option to run the app - 'yes' or 'no'
if __name__ == "__main__":
    response = input("Do you want to run the CSUF Food Review Application? (Yes/No): ").strip().lower()
    if response in ['Yes', 'yes', 'y']:
        app.run()
    else:
        print("App will not execute.")

