from flask import Flask, render_template

app = Flask(__name__) #flask

# Handling of the root
@app.route("/")
def home():
    #   Render Chris's HTML file
    return render_template('chris_new_file.html')


# If the current file being ran is THIS file
if __name__ == "__main__":
    app.run()

#Chris is pushing this comment
print("Hello World")