import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/meu_banco')
client = MongoClient(mongo_uri)
db = client.meu_banco

@app.route('/users', methods=['POST'])
def add_user():
    user = request.json
    result = db.users.insert_one(user)
    return jsonify({"id": str(result.inserted_id)}), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = list(db.users.find())
    for user in users:
        user["_id"] = str(user["_id"])
    return jsonify(users)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
