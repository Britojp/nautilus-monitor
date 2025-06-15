import { STATUS_COLORS, SEVERITY_COLORS, SEVERITY_BADGES, METRIC_TOOLTIPS } from "./constants"

export function getMetricStatus(valor: number, min: number, max: number) {
  if (valor < min || valor > max) return "critical"
  if (valor < min * 1.1 || valor > max * 0.9) return "warning"
  return "normal"
}

export function getStatusColor(status: keyof typeof STATUS_COLORS) {
  return STATUS_COLORS[status]
}

export function getSeveridadeColor(severidade: string) {
  const key = severidade.toLowerCase() as keyof typeof SEVERITY_COLORS
  return SEVERITY_COLORS[key] || SEVERITY_COLORS.default
}

export function getSeveridadeBadge(severidade: string) {
  const key = severidade.toLowerCase() as keyof typeof SEVERITY_BADGES
  return SEVERITY_BADGES[key] || SEVERITY_BADGES.default
}

export function getMetricTooltip(metric: keyof typeof METRIC_TOOLTIPS) {
  return METRIC_TOOLTIPS[metric] || "Métrica de monitoramento do sistema"
}
