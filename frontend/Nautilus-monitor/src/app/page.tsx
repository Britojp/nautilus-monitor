
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useLimitsUpdate } from "@/hooks/useLimitsUpdate"
import type { LimitConfig } from "@/types/types"
import { useNautilusData } from "@/hooks/useNautilusData"
import { LoadingScreen } from "@/components/LoadingScreen"
import { SystemControl } from "@/components/SystemControl"
import { Dashboard } from "@/components/Dashboard"
import { LimitsConfiguration } from "@/components/LimitsConfiguration"
import { AlertsSection } from "@/components/AlertsSection"


export default function NautilusMonitor() {
  const { currentData, dataHistory, limits, setLimits, lastUpdate, loading, error, refreshData } = useNautilusData()
  const { isUpdating, updateSuccess, updateError, updateLimits } = useLimitsUpdate()

  const [tempLimits, setTempLimits] = useState<LimitConfig | null>(null)
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(false)

  // Sync tempLimits with limits when limits change
  useEffect(() => {
    if (limits) {
      setTempLimits(limits)
    }
  }, [limits])

  // Auto-refresh when simulator is running
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSimulatorRunning) {
      interval = setInterval(() => {
        refreshData()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSimulatorRunning, refreshData])

  const toggleSimulator = () => {
    setIsSimulatorRunning(!isSimulatorRunning)
  }

  const handleUpdateTempLimits = (key: keyof LimitConfig, value: number) => {
    setTempLimits((prev) => (prev ? { ...prev, [key]: value } : null))
  }

  const handleApplyLimits = async () => {
    if (!tempLimits) return

    await updateLimits(tempLimits, (newLimits) => {
      setLimits(newLimits)
      refreshData() // Refresh data to reflect new limits
    })
  }

  if (loading) {
    return <LoadingScreen type="loading" />
  }

  if (error && !currentData) {
    return <LoadingScreen type="error" error={error} onRetry={refreshData} />
  }

  if (!currentData || !limits || !tempLimits) {
    return <LoadingScreen type="error" error="Nenhum dado disponível" />
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Nautilus Monitor</h1>
            <p className="text-lg text-muted-foreground">Sistema de Monitoramento LoRaWAN em Tempo Real</p>
            <p className="text-sm text-muted-foreground">
              Setor {currentData.leitura.setor} • Última atualização: {lastUpdate?.toLocaleTimeString() || "--"}
            </p>
          </div>

          {/* System Control */}
          <SystemControl
            isSimulatorRunning={isSimulatorRunning}
            onToggleSimulator={toggleSimulator}
            onManualRefresh={refreshData}
            error={error || updateError}
            updateSuccess={updateSuccess}
          />

          {/* Main Content */}
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 transition-all duration-200"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="limits"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 transition-all duration-200"
              >
                Configuração de Limites
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 transition-all duration-200"
              >
                Alertas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Dashboard currentData={currentData} limits={limits} dataHistory={dataHistory} />
            </TabsContent>

            <TabsContent value="limits">
              <LimitsConfiguration
                tempLimits={tempLimits}
                onUpdateTempLimits={handleUpdateTempLimits}
                onApplyLimits={handleApplyLimits}
                isUpdating={isUpdating}
              />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertsSection alerts={currentData.alertas} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
