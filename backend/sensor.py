from datetime import datetime, timezone
import random
from models import SensorLeitura

"""
Representa um sensor físico simulado que gera as leituras.

Atributos:
    setor (str): identificador do setor onde o sensor está.

Métodos:
    gerar_leitura(): retorna uma leitura simulada do leitor.
"""
class Sensor:
    def __init__(self, setor: str):
        self.setor = setor


    """Gera nova leitura com dados aleatórios dentro de uma faixa definida"""
    def gerar_leitura(self) -> SensorLeitura:
        return SensorLeitura(
            setor=self.setor,
            temperatura=random.uniform(70,220),
            umidade=random.uniform(35,95),
            voltagem=random.uniform(13.8,15),
            corrente=random.uniform(6,8),
            impedancia=random.uniform(1.4,1.95),
            timestamp=datetime.now(timezone.utc)
        )
