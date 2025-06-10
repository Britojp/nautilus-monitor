from typing import Optional

"""
Calcula severidade conforme percentual de variação
"""
def calcular_severidade(valor: float, min_:float, max_: float) -> Optional[str]:
    if min_ <= valor <= max_:
        return None

    dif = abs(valor - max_) if valor > max_ else abs(valor - min_)

    if (dif / valor) <= 0.1:
        sev = "baixa"

    elif (dif / valor) <= 0.15:
        sev = "média"
    
    elif (dif / valor) <= 0.2:
        sev = "alta"

    else:
        sev = "crítica"

    return sev

"""
Definição dos códigos dos alertas
"""
codigos = {
    "temperatura": 1,
    "umidade": 2,
    "voltagem": 3,
    "corrente": 4,
    "impedancia": 5,
    "sinal_lora": 6
}

"""
Retorna o código correspondente a cada alerta

1 código para cada elemento de SensorLeitura

Ex.: Código 1 indica alerta de temperatura
"""
def codigo_alerta(elemento: str) -> int:
    try:
        return codigos[elemento]
    except KeyError:
        raise ValueError(f"Variável '{elemento}' não tem código de alerta definido.")
