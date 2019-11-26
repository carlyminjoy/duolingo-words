from flask import Flask, jsonify, request
from flask_cors import CORS
import duolingo
port = process.env.PORT or 5555

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

lingo  = duolingo.Duolingo('Stingymingy', password='crystal0375')

@app.route("/")
def root():
    return 'Hey'

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
    app.run(host='0.0.0.0', port=port)
