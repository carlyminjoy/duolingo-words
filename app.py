from flask import Flask, jsonify, request
from flask_cors import CORS
import duolingo
port = 8000

app = Flask(__name__, static_url_path='')
CORS(app, resources={r'/*': {'origins': '*'}})

lingo  = duolingo.Duolingo('Stingymingy', password='abcd1234')

@app.route("/")
def root():
    return app.send_static_file('/dist/index.html')

@app.route("/user")
def user():
    return jsonify(lingo.get_user_info())

@app.route("/words")
def words():
    response = lingo.get_vocabulary(language_abbr='es')
    
    return jsonify(response)

@app.route("/translations")
def translations():
    words = list(lingo.get_known_words('es'))
    response = lingo.get_translations(words, source='en', target='es')

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=port)
