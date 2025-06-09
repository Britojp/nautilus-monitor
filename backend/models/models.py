from pydantic import BaseModel, Field
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
"""
class SensorLeitura(BaseModel):
    setor:str
    temperatura:float
    umidade:float
    voltagem:float
    corrente:float
    impedancia:complex
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
    impedancia_min: complex
    impedancia_max: complex


"""
Estrutura dos dados de alerta
"""
class Alerta(BaseModel):
    mensagem: str
    timestamp: datetime = Field(default_factory=lambda : datetime.now(timezone.utc))
    codigo: int
    severidade: str
