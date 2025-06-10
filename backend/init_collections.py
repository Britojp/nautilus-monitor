from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["meu_banco"]

def collection_helper(nome, validador):
    if nome in db.list_collection_names():
        print(f"Collection '{nome}' já existe. Pulando criação.")
    else:
        db.create_collection(nome, validator=validador)
        print(f"Collection '{nome}' criada com sucesso.")

# Limites padrão
limites_default = {
    "_id": "global",
    "temperatura_min": 75.0,
    "temperatura_max": 105.0,
    "umidade_min": 40.0,
    "umidade_max": 60.0,
    "voltagem_min": 13.8,
    "voltagem_max": 14.8,
    "corrente_min": 6.1,
    "corrente_max": 7.1,
    "impedancia_min": 1.45,
    "impedancia_max": 1.70,
    "sinal_lora_min": -85,
    "sinal_lora_max": -30
}

if not db.limites.find_one({"_id": "global"}):
    db.limites.insert_one(limites_default)
    print("Limites padrão inseridos.")
else:
    print("Limites já existentes — nada foi feito.")

"""
Criação da collection de leitura dos sensores
"""
validador_leitura = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["setor", "temperatura", "umidade", "voltagem", "corrente", "impedancia", "sinal_lora", "timestamp"],
        "properties": {
            "setor": {"bsonType": "string"},
            "temperatura": {"bsonType": "double"},
            "umidade": {"bsonType": "double"},
            "voltagem": {"bsonType": "double"},
            "corrente": {"bsonType": "double"},
            "impedancia": {"bsonType": "double"},
            "sinal_lora": {"bsonType": "int"},
            "timestamp": {"bsonType": "date"}
        }
    }
}
collection_helper("leitura_sensores", validador_leitura)

"""
Criação das collection dos limites
"""
validador_limites = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "temperatura_min", "temperatura_max",
            "umidade_min", "umidade_max",
            "voltagem_min", "voltagem_max",
            "corrente_min", "corrente_max",
            "impedancia_min", "impedancia_max",
            "sinal_lora_min", "sinal_lora_max"
        ],
        "properties": {
            "temperatura_min": {"bsonType": "double"},
            "temperatura_max": {"bsonType": "double"},
            "umidade_min": {"bsonType": "double"},
            "umidade_max": {"bsonType": "double"},
            "voltagem_min": {"bsonType": "double"},
            "voltagem_max": {"bsonType": "double"},
            "corrente_min": {"bsonType": "double"},
            "corrente_max": {"bsonType": "double"},
            "impedancia_min": {"bsonType": "double"},
            "impedancia_max": {"bsonType": "double"},
            "sinal_lora_min": {"bsonType": "int"},
            "sinal_lora_max": {"bsonType": "int"}
        }
    }
}
collection_helper("limites", validador_limites)

"""
Criação da collection dos alarmes
"""
validador_alertas = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["mensagem", "codigo", "severidade", "timestamp"],
        "properties": {
            "mensagem": {"bsonType": "string"},
            "codigo": {"bsonType": "int"},
            "severidade": {
                "bsonType": "string",
                "enum": ["baixa", "média", "alta", "crítica"]
            },
            "timestamp": {"bsonType": "date"}
        }
    }
}
collection_helper("alertas", validador_alertas)
