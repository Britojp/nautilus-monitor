"use client"

import { RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoadingScreenProps {
  type: "loading" | "error"
  error?: string
  onRetry?: () => void
}

export function LoadingScreen({ type, error, onRetry }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {type === "loading" ? (
          <>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-400 mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Carregando dados da API...</p>
          </>
        ) : (
          <>
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Erro de Conexão</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            {onRetry && (
              <Button onClick={onRetry} className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
