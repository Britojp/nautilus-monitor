"use client"

import { useState, useEffect, useCallback } from "react"
import type { LimitConfig, SensorData, ApiResponse } from "../types/types"
import { fetchData } from "../api/api"

export function useNautilusData() {
  const [currentData, setCurrentData] = useState<ApiResponse | null>(null)
  const [dataHistory, setDataHistory] = useState<SensorData[]>([])
  const [limits, setLimits] = useState<LimitConfig | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCurrentData = useCallback(async () => {
    try {
      setError(null)
      const data = await fetchData("http://localhost:5000/sensor-data")
      setCurrentData(data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Erro ao buscar dados atuais:", error)
      setError("Erro ao conectar com a API")
    }
  }, [])

  const fetchHistoricalData = useCallback(async () => {
    try {
      const data = await fetchData("http://localhost:5000/sensor-data/historico")
      setDataHistory(data)
    } catch (error) {
      console.error("Erro ao buscar dados históricos:", error)
    }
  }, [])

  const fetchLimits = useCallback(async () => {
    try {
      const data = await fetchData("http://localhost:5000/limites")
      setLimits(data)
    } catch (error) {
      console.error("Erro ao buscar limites:", error)
    }
  }, [])

  const refreshData = useCallback(() => {
    fetchCurrentData()
    fetchHistoricalData()
  }, [fetchCurrentData, fetchHistoricalData])

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      await Promise.all([fetchCurrentData(), fetchHistoricalData(), fetchLimits()])
      setLoading(false)
    }

    loadInitialData()
  }, [fetchCurrentData, fetchHistoricalData, fetchLimits])

  return {
    currentData,
    dataHistory,
    limits,
    setLimits,
    lastUpdate,
    loading,
    error,
    refreshData,
  }
}
