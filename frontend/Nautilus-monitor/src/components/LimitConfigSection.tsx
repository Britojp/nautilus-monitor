"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LucideIcon } from "lucide-react"
import type { LimitConfig } from "../types/types"

interface LimitConfigSectionProps {
  title: string
  unit: string
  icon: LucideIcon
  minValue: number
  maxValue: number
  minKey: keyof LimitConfig
  maxKey: keyof LimitConfig
  step?: string
  onUpdate: (key: keyof LimitConfig, value: number) => void
}

export function LimitConfigSection({
  title,
  unit,
  icon: Icon,
  minValue,
  maxValue,
  minKey,
  maxKey,
  step = "1",
  onUpdate,
}: LimitConfigSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-400" />
        {title} ({unit})
      </h3>
      <div className="space-y-2">
        <Label htmlFor={`${minKey}-min`} className="text-slate-300">
          Mínimo
        </Label>
        <Input
          id={`${minKey}-min`}
          type="number"
          step={step}
          value={minValue}
          className="bg-slate-700 text-white border-slate-600 focus:border-slate-500"
          onChange={(e) => onUpdate(minKey, Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${maxKey}-max`} className="text-slate-300">
          Máximo
        </Label>
        <Input
          id={`${maxKey}-max`}
          type="number"
          step={step}
          value={maxValue}
          className="bg-slate-700 text-white border-slate-600 focus:border-slate-500"
          onChange={(e) => onUpdate(maxKey, Number(e.target.value))}
        />
      </div>
    </div>
  )
}
