from backend.sensor import Sensor
from models import SensorLeitura, Limites, Alerta

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from random import randint

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/meu_banco')
client = MongoClient(mongo_uri)
db = client.meu_banco

setores = ["A1", "A2", "B1", "B2", "C3", "E4"]

limites = {
    "temperatura": (75, 105),
    "umidade": (40, 60),
    "voltagem": (13.8, 14.8),
    "corrente": (6.1, 7.1),
    "impedancia": (1.45, 1.7)
}

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

@app.route('/sensor-data', methods=['GET'])
def simular_leitura():
    sensor = Sensor(setor=setores[randint(0,5)])
    leitura = sensor.gerar_leitura()
    db.dados.insert_one(leitura.dict)
    verificar_limites(leitura)
    return jsonify(leitura.dict)

def verificar_limites(dado: SensorLeitura):
    for var in limites:
        valor = getattr(dado, var)
        
        min_, max_ = limites[var]

        if not (min_ <= valor <= max_):
            msg = f"{var.capitalize()} fora do limite: {valor} no setor {dado.setor}"
            alerta = Alerta(mensagem=msg)
            db.alertas.insert_one(alerta.dict())