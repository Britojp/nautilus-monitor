from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional

class SensorLeitura(BaseModel):
    setor:str
    temperatura:float
    umidade:float
    voltagem:float
    corrente:float
    impedancia:float
    timestamp: Optional[datetime] = Field(default_factory=datetime.now(timezone.utc))

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

class Alerta(BaseModel):
    mensagem: str
    timestamp: datetime = Field(default_factory=lambda : datetime.now(timezone.utc))
