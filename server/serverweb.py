from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return '¡Hola, mundo!'

@app.route('/api')
def api():
    return {'hello': 'world'}


if __name__ == '__main__':
    app.run(port=8000)