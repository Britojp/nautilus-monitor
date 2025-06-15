"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Settings, CheckCircle, Loader2, Thermometer, Droplets, Zap, Activity, Gauge, Radio } from "lucide-react"
import { LimitConfigSection } from "./LimitConfigSection"
import type { LimitConfig } from "../types/types"

interface LimitsConfigurationProps {
  tempLimits: LimitConfig
  onUpdateTempLimits: (key: keyof LimitConfig, value: number) => void
  onApplyLimits: () => void
  isUpdating: boolean
}

export function LimitsConfiguration({
  tempLimits,
  onUpdateTempLimits,
  onApplyLimits,
  isUpdating,
}: LimitsConfigurationProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Settings className="h-5 w-5 text-slate-400" />
          Configuração de Limites de Operação Segura
        </CardTitle>
        <CardDescription className="text-slate-400">
          Defina os valores mínimos e máximos para todos os sensores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LimitConfigSection
            title="Temperatura"
            unit="°C"
            icon={Thermometer}
            minValue={tempLimits.temperatura_min}
            maxValue={tempLimits.temperatura_max}
            minKey="temperatura_min"
            maxKey="temperatura_max"
            onUpdate={onUpdateTempLimits}
          />
          <LimitConfigSection
            title="Umidade"
            unit="%"
            icon={Droplets}
            minValue={tempLimits.umidade_min}
            maxValue={tempLimits.umidade_max}
            minKey="umidade_min"
            maxKey="umidade_max"
            onUpdate={onUpdateTempLimits}
          />
          <LimitConfigSection
            title="Voltagem"
            unit="V"
            icon={Zap}
            minValue={tempLimits.voltagem_min}
            maxValue={tempLimits.voltagem_max}
            minKey="voltagem_min"
            maxKey="voltagem_max"
            step="0.1"
            onUpdate={onUpdateTempLimits}
          />
          <LimitConfigSection
            title="Corrente"
            unit="A"
            icon={Activity}
            minValue={tempLimits.corrente_min}
            maxValue={tempLimits.corrente_max}
            minKey="corrente_min"
            maxKey="corrente_max"
            step="0.1"
            onUpdate={onUpdateTempLimits}
          />
          <LimitConfigSection
            title="Impedância"
            unit="Ω"
            icon={Gauge}
            minValue={tempLimits.impedancia_min}
            maxValue={tempLimits.impedancia_max}
            minKey="impedancia_min"
            maxKey="impedancia_max"
            step="0.01"
            onUpdate={onUpdateTempLimits}
          />
          <LimitConfigSection
            title="Sinal"
            unit="dBm"
            icon={Radio}
            minValue={tempLimits.sinal_min}
            maxValue={tempLimits.sinal_max}
            minKey="sinal_min"
            maxKey="sinal_max"
            onUpdate={onUpdateTempLimits}
          />
        </div>

        <Separator className="bg-slate-600" />

        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-400">
            Os limites serão aplicados em tempo real para detecção de anomalias
          </div>
          <Button
            onClick={onApplyLimits}
            disabled={isUpdating}
            className="bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-slate-600/20 transition-all duration-200"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Aplicar Limites
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
