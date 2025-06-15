import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Zap, Activity, Gauge, Radio, Wifi, AlertTriangle, Bell } from "lucide-react"
import { StatusCard } from "./StatusCard"
import { MetricCard } from "./MetricCard"
import { HistoryItem } from "./HistoryItem"
import { getMetricTooltip } from "../utils/helpers"
import type { ApiResponse, LimitConfig, SensorData } from "../types/types"

interface DashboardProps {
  currentData: ApiResponse
  limits: LimitConfig
  dataHistory: SensorData[]
}

export function Dashboard({ currentData, limits, dataHistory }: DashboardProps) {
  const alertasCriticos = currentData.alertas.filter((a) => a.severidade === "crítica").length
  const alertasBaixos = currentData.alertas.filter((a) => a.severidade === "baixa").length

  return (
    <div className="space-y-6">
      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Setor Ativo"
          value={currentData.leitura.setor}
          description="Sistema operacional"
          icon={Wifi}
          variant="default"
        />
        <StatusCard
          title="Alertas Críticos"
          value={alertasCriticos}
          description="Requer atenção imediata"
          icon={AlertTriangle}
          variant="critical"
        />
        <StatusCard
          title="Alertas Baixos"
          value={alertasBaixos}
          description="Monitoramento contínuo"
          icon={Bell}
          variant="warning"
        />
        <StatusCard
          title="Total de Alertas"
          value={currentData.alertas.length}
          description="Sistema monitorado"
          icon={Bell}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Temperatura"
          value={currentData.leitura.temperatura}
          unit="°C"
          icon={Thermometer}
          min={limits.temperatura_min}
          max={limits.temperatura_max}
          tooltip={getMetricTooltip("temperatura")}
        />
        <MetricCard
          title="Umidade"
          value={currentData.leitura.umidade}
          unit="%"
          icon={Droplets}
          min={limits.umidade_min}
          max={limits.umidade_max}
          tooltip={getMetricTooltip("umidade")}
        />
        <MetricCard
          title="Voltagem"
          value={currentData.leitura.voltagem}
          unit="V"
          icon={Zap}
          min={limits.voltagem_min}
          max={limits.voltagem_max}
          tooltip={getMetricTooltip("voltagem")}
        />
        <MetricCard
          title="Corrente"
          value={currentData.leitura.corrente}
          unit="A"
          icon={Activity}
          min={limits.corrente_min}
          max={limits.corrente_max}
          tooltip={getMetricTooltip("corrente")}
        />
        <MetricCard
          title="Impedância"
          value={currentData.leitura.impedancia}
          unit="Ω"
          icon={Gauge}
          min={limits.impedancia_min}
          max={limits.impedancia_max}
          tooltip={getMetricTooltip("impedancia")}
        />
        <MetricCard
          title="Sinal"
          value={currentData.leitura.sinal}
          unit=" dBm"
          icon={Radio}
          min={limits.sinal_min}
          max={limits.sinal_max}
          tooltip={getMetricTooltip("sinal")}
        />
      </div>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Leituras</CardTitle>
          <CardDescription className="text-slate-400">Últimas leituras dos sensores da API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataHistory.slice(0, 10).map((data, index) => (
              <HistoryItem key={index} data={data} />
            ))}
            {dataHistory.length === 0 && (
              <div className="text-center text-slate-400 py-8">Nenhum dado histórico disponível.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
