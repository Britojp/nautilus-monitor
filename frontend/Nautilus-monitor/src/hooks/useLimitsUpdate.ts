"use client"

import { useState, useCallback } from "react"
import type { LimitConfig } from "../types/types"

export function useLimitsUpdate() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  const putLimits = useCallback(async (newLimits: LimitConfig) => {
    try {
      const response = await fetch("http://localhost:5000/limites", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLimits),
      })
      if (!response.ok) {
        throw new Error("Erro ao atualizar limites")
      }
      return await response.json()
    } catch (error) {
      console.error("Erro ao atualizar limites:", error)
      throw error
    }
  }, [])

  const updateLimits = useCallback(
    async (newLimits: LimitConfig, onSuccess?: (limits: LimitConfig) => void) => {
      setIsUpdating(true)
      setUpdateError(null)
      try {
        await putLimits(newLimits)
        setUpdateSuccess(true)
        onSuccess?.(newLimits)
        setTimeout(() => setUpdateSuccess(false), 3000)
      } catch (error) {
        setUpdateError("Erro ao atualizar limites na API")
      } finally {
        setIsUpdating(false)
      }
    },
    [putLimits],
  )

  return {
    isUpdating,
    updateSuccess,
    updateError,
    updateLimits,
  }
}
