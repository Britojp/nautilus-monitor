import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Info, type LucideIcon } from "lucide-react"
import { getMetricStatus } from "../utils/helpers"

interface MetricCardProps {
  title: string
  value: number
  unit: string
  icon: LucideIcon
  min: number
  max: number
  tooltip: string
}

export function MetricCard({ title, value, unit, icon: Icon, min, max, tooltip }: MetricCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive/10 border-destructive/50 shadow-destructive/20"
      case "warning":
        return "bg-chart-4/10 border-chart-4/50 shadow-chart-4/20"
      default:
        return "bg-card border-border shadow-lg"
    }
  }

  const status = getMetricStatus(value, min, max)
  const statusStyles = getStatusStyles(status)

  return (
    <TooltipProvider>
      <Card className={`backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${statusStyles}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400 hover:text-slate-300 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 text-white border-slate-600 max-w-xs">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">
            {value.toFixed(title === "Sinal" ? 0 : title === "Impedância" ? 2 : 1)}
            {unit}
          </div>
          <p className="text-xs text-muted-foreground">
            Limite: {min}
            {unit} - {max}
            {unit}
          </p>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
