export const METRIC_TOOLTIPS = {
  temperatura:
    "Medição da temperatura ambiente em graus Celsius. Valores fora do limite podem indicar superaquecimento ou falha no sistema de refrigeração.",
  umidade:
    "Percentual de umidade relativa do ar. Níveis inadequados podem afetar equipamentos eletrônicos e causar corrosão.",
  voltagem:
    "Tensão elétrica medida em Volts. Variações podem indicar problemas na alimentação elétrica ou instabilidade da rede.",
  corrente:
    "Intensidade da corrente elétrica em Ampères. Valores anômalos podem indicar sobrecarga ou falha nos componentes.",
  impedancia:
    "Resistência elétrica medida em Ohms. Alterações podem indicar problemas de conectividade ou degradação dos componentes.",
  sinal: "Intensidade do sinal LoRaWAN em dBm. Valores baixos podem indicar problemas de comunicação ou interferência.",
} as const

export const STATUS_COLORS = {
  critical: "text-red-300 bg-red-950 border-red-700 shadow-red-900/20",
  warning: "text-yellow-300 bg-yellow-950 border-yellow-700 shadow-yellow-900/20",
  normal: "text-emerald-300 bg-emerald-950 border-emerald-700 shadow-emerald-900/20",
} as const

export const SEVERITY_COLORS = {
  crítica: "border-red-600 bg-red-950 text-red-100",
  alta: "border-orange-600 bg-orange-950 text-orange-100",
  média: "border-yellow-600 bg-yellow-950 text-yellow-100",
  baixa: "border-blue-600 bg-blue-950 text-blue-100",
  default: "border-gray-600 bg-gray-950 text-gray-100",
} as const

export const SEVERITY_BADGES = {
  crítica: "destructive",
  alta: "destructive",
  média: "default",
  baixa: "secondary",
  default: "outline",
} as const
