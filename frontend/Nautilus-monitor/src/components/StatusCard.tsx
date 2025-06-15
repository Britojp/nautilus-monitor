import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatusCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  variant: "default" | "critical" | "warning" | "success"
}

export function StatusCard({ title, value, description, icon: Icon, variant }: StatusCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "critical":
        return "bg-destructive/10 border-destructive/20 text-destructive-foreground"
      case "warning":
        return "bg-chart-4/10 border-chart-4/20 text-chart-4"
      case "success":
        return "bg-chart-2/10 border-chart-2/20 text-chart-2"
      default:
        return "bg-card border-border text-card-foreground"
    }
  }

  return (
    <Card className={`${getVariantStyles()} shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 opacity-70" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs opacity-70">{description}</p>
      </CardContent>
    </Card>
  )
}
