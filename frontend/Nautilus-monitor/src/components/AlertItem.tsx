import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { getSeveridadeColor, getSeveridadeBadge } from "../utils/helpers"
import type { AlertData } from "../types/types"

interface AlertItemProps {
  alert: AlertData
}

export function AlertItem({ alert }: AlertItemProps) {
  return (
    <Alert className={getSeveridadeColor(alert.severidade)}>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-medium">{alert.mensagem}</p>
            <p className="text-sm opacity-80 mt-1">Código: #{alert.codigo}</p>
          </div>
          <div className="text-right ml-4">
            <Badge variant={getSeveridadeBadge(alert.severidade)}>{alert.severidade.toUpperCase()}</Badge>
            <p className="text-xs opacity-80 mt-1">{new Date(alert.timestamp).toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
