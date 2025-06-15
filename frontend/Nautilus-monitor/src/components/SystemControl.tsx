"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Play, Square, RefreshCw, CheckCircle } from "lucide-react"

interface SystemControlProps {
  isSimulatorRunning: boolean
  onToggleSimulator: () => void
  onManualRefresh: () => void
  error: string | null
  updateSuccess: boolean
}

export function SystemControl({
  isSimulatorRunning,
  onToggleSimulator,
  onManualRefresh,
  error,
  updateSuccess,
}: SystemControlProps) {
  return (
    <Card className="bg-card border-border backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Wifi className="h-5 w-5 text-muted-foreground" />
          Controle do Sistema
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Controle do monitoramento automático e atualização manual dos dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button
            onClick={onToggleSimulator}
            variant={isSimulatorRunning ? "destructive" : "default"}
            className={`flex items-center gap-2 transition-all duration-200 ${
              !isSimulatorRunning ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-lg" : ""
            }`}
          >
            {isSimulatorRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isSimulatorRunning ? "Parar Monitoramento" : "Iniciar Monitoramento"}
          </Button>
          <Button
            onClick={onManualRefresh}
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Badge
            variant={isSimulatorRunning ? "default" : "secondary"}
            className={`transition-all duration-200 ${
              isSimulatorRunning ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-600 text-slate-300"
            }`}
          >
            {isSimulatorRunning ? "Ativo" : "Inativo"}
          </Badge>
          {error && <Badge variant="destructive">Erro de Conexão</Badge>}
          {updateSuccess && (
            <Badge className="bg-emerald-600 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Limites Atualizados
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
