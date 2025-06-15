export interface SensorData {
  corrente: number
  impedancia: number
  setor: string
  sinal: number
  temperatura: number
  timestamp: string
  umidade: number
  voltagem: number
}

export interface AlertData {
  codigo: number
  mensagem: string
  severidade: string
  timestamp: string
}

export interface LimitConfig {
  corrente_max: number
  corrente_min: number
  impedancia_max: number
  impedancia_min: number
  sinal_max: number
  sinal_min: number
  temperatura_max: number
  temperatura_min: number
  umidade_max: number
  umidade_min: number
  voltagem_max: number
  voltagem_min: number
}

export interface ApiResponse {
  alertas: AlertData[]
  leitura: SensorData
}
