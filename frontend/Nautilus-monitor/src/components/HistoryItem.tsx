import { Badge } from "@/components/ui/badge"
import type { SensorData } from "../types/types"

interface HistoryItemProps {
  data: SensorData
}

export function HistoryItem({ data }: HistoryItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border border-slate-600 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-200">
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-slate-500 text-slate-300">
          {data.setor}
        </Badge>
        <div className="text-sm space-x-4 text-slate-300">
          <span> {data.temperatura.toFixed(1)}°C</span>
          <span> {data.umidade.toFixed(1)}%</span>
          <span> {data.voltagem.toFixed(2)}V</span>
          <span> {data.corrente.toFixed(2)}A</span>
        </div>
      </div>
      <div className="text-xs text-slate-400">{new Date(data.timestamp).toLocaleString("pt-BR")}</div>
    </div>
  )
}
