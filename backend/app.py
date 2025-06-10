from backend.limites import calcular_severidade, codigo_alerta
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

limites_doc = db.limites.find_one({"_id": "global"})
if not limites_doc:
    raise Exception("Limites não definidos.")

limites_doc.pop("_id")
limites = Limites(**limites_doc)

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

# Gera uma leitura com valores aleatórios para simular o sensor, enviando os alertas se gerados
@app.route('/sensor-data', methods=['GET'])
def simular_leitura():
    sensor = Sensor(setor=setores[randint(0,5)])
    leitura = sensor.gerar_leitura()
    db.leitura_sensores.insert_one(leitura.dict())

    alertas = verificar_limites(leitura)

    return jsonify({
        "leitura": leitura.dict(),
        "alertas": alertas
    })

# Últimas 50 leituras
@app.route('/sensor-data/historico', methods=['GET'])
def historico_leituras():
    leituras_cursor = db.leitura_sensores.find().sort("timestamp", -1).limit(50)
    leituras = []

    for doc in leituras_cursor:
        doc["_id"] = str(doc["_id"])
        leituras.append(doc)

    return jsonify(leituras)

def verificar_limites(dado: SensorLeitura) -> list:
    alertas_gerados = []

    for var in limites.dict():
        base = var.split("_")[0]
        if f"{base}_min" not in limites.dict():
            continue

        min_ = getattr(limites, f"{base}_min")
        max_ = getattr(limites, f"{base}_max")
        valor = getattr(dado, base)

        if not (min_ <= valor <= max_):
            sev = calcular_severidade(valor, min_, max_)
            cod = codigo_alerta(base)
            msg = f"{base.capitalize()} fora do limite: {valor} no setor {dado.setor}"

            alerta = Alerta(mensagem=msg, codigo=cod, severidade=sev)
            db.alertas.insert_one(alerta.dict())
            alertas_gerados.append(alerta.dict())

    return alertas_gerados


# Retorna o limite global
@app.route('/limites', methods=['GET'])
def obter_limites():
    limites_data = db.limites.find_one({"_id": "global"})
    if not limites_data:
        return jsonify({"erro": "Limites não definidos"}), 404

    limites_data.pop('_id')  # remover _id do Mongo
    return jsonify(limites_data)

# Atualiza o limite global
@app.route('/limites', methods=['PUT'])
def atualizar_limites():
    try:
        novo_limite = Limites(**request.get_json())
    except Exception as e:
        return jsonify({"erro": f"Dados inválidos: {str(e)}"}), 400

    db.limites.replace_one({"_id": "global"}, novo_limite.dict(), upsert=True)
    global limites
    limites = novo_limite
    return jsonify({"mensagem": "Limites atualizados com sucesso"})
