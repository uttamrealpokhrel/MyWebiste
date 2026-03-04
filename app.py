from flask import Flask, render_template, jsonify, request, send_from_directory
import webbrowser
import threading
import time
import os

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')


# Serve HTML files directly
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/signin")
def signin():
    return render_template("signin.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/follow")
def follow():
    return render_template("follow.html")

@app.route("/skills")
def skills():
    skills_list = ["HTML & CSS", "JavaScript", "Python", "Artificial Intelligence", "YouTube Content Creation"]
    return jsonify(skills_list)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower()
    response = get_ai_response(message)
    return jsonify({"response": response})

def get_ai_response(message):
    responses = {
        "hello": "Hello! I'm Uttam's AI assistant. How can I help you?",
        "hi": "Hi there! What would you like to know about Uttam?",
        "skills": "Uttam specializes in HTML & CSS, JavaScript, Python, Artificial Intelligence, and YouTube Content Creation.",
        "youtube": "Check out Uttam's YouTube channel at https://youtube.com/@UttamRealPok for amazing tech content!",
        "contact": "You can contact Uttam via email at uttampokhrel@example.com or through his YouTube channel.",
        "projects": "Uttam works on AI tools, web apps, and educational YouTube content. Visit his channel for more!",
        "about": "Uttam is a passionate content creator and B.Sc.CSIT student at Tribhuvan University, exploring AI and tech.",
        "default": "That's interesting! Uttam loves discussing AI, coding, and content creation. What else would you like to know?"
    }
    for key in responses:
        if key in message:
            return responses[key]
    return responses["default"]

def open_browser():
    time.sleep(1)  # Wait for server to start
    webbrowser.open('http://127.0.0.1:5000/')

if __name__ == "__main__":
    threading.Thread(target=open_browser).start()
    app.run(debug=True)