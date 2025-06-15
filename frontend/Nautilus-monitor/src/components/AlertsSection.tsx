import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle } from "lucide-react"
import { AlertItem } from "./AlertItem"
import type { AlertData } from "../types/types"

interface AlertsSectionProps {
  alerts: AlertData[]
}

export function AlertsSection({ alerts }: AlertsSectionProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bell className="h-5 w-5 text-slate-400" />
          Sistema de Alertas
        </CardTitle>
        <CardDescription className="text-slate-400">
          Alertas gerados automaticamente pela API quando valores excedem os limites configurados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <AlertItem key={index} alert={alert} />
          ))}
          {alerts.length === 0 && (
            <div className="text-center text-slate-400 py-8 flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-emerald-400" />
              <p>Nenhum alerta ativo. O sistema está operando dentro dos limites configurados.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
