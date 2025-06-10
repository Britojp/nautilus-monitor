from pydantic import BaseModel, Field, root_validator
from datetime import datetime, timezone
from typing import Optional

"""
Estrutura dos dados da leitura do sensor

Setor (str) : Setor onde se encontra o sensor

Temperatura (float) : Temperatura medida no componente elétrico da infraestrutura expressa em °C

Umidade (float) : Umidade relativa encontrada no ambiente expressa em %

Voltagem (float) : Voltagem medida no componente elétrico da infraestrutura expressa em kV

Corrente (float) : Corrente elétrica que passa no componente elétrico expressa em kA

Impedância (float) : Magnitude da impedância no componente elétrico expressa em Ohms

Sinal LoRa (int) : Potência do sinal recebido expressa em decibéis-miliwatts (dBm)

Timestamp (datetime) : Registro da data e hora da leitura
"""
class SensorLeitura(BaseModel):
    setor:str
    temperatura:float
    umidade:float
    voltagem:float
    corrente:float
    impedancia:float
    sinal: int
    timestamp: Optional[datetime] = Field(default_factory=datetime.now(timezone.utc))

"""
Estrutura dos dados de definição dos limites

Valores máximo e mínimo para cada atributo de SensorLeitura
"""
class Limites(BaseModel):
    temperatura_min: float
    temperatura_max: float
    umidade_min: float
    umidade_max: float
    voltagem_min: float
    voltagem_max: float
    corrente_min: float
    corrente_max: float
    impedancia_min: float
    impedancia_max: float
    sinal_min: int
    sinal_max: int

    @root_validator
    def validar_pares_min_max(cls, valores):
        campos = ["temperatura", "umidade", "voltagem", "corrente", "impedancia", "sinal"]
        erros = []

        for campo in campos:
            min_val = valores.get(f"{campo}_min")
            max_val = valores.get(f"{campo}_max")

            if min_val is not None and max_val is not None:
                if min_val >= max_val:
                    erros.append(f"{campo}_min ({min_val}) deve ser menor que {campo}_max ({max_val})")

        if erros:
            raise ValueError(" | ".join(erros))
        return valores

"""
Estrutura dos dados de alerta
"""
class Alerta(BaseModel):
    mensagem: str
    timestamp: datetime = Field(default_factory=lambda : datetime.now(timezone.utc))
    codigo: int
    severidade: str
