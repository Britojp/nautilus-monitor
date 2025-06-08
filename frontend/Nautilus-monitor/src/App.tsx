"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Wifi,
  Settings,
  Bell,
  Play,
  Square,
} from "lucide-react";

interface SensorData {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
  rssi: number;
}

interface LimitConfig {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
}

interface AlertData {
  id: string;
  type: "temperature" | "humidity";
  message: string;
  value: number;
  limit: number;
  timestamp: string;
  severity: "warning" | "critical";
}

export default function NautilusMonitor() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [limits, setLimits] = useState<LimitConfig>({
    temperature: { min: 15, max: 35 },
    humidity: { min: 30, max: 70 },
  });
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(false);
  const [tempLimits, setTempLimits] = useState(limits);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulatorRunning) {
      interval = setInterval(() => {
        const newData: SensorData = {
          id: Math.random().toString(36).substr(2, 9),
          deviceId: `LORA_${Math.floor(Math.random() * 5) + 1}`,
          temperature: Math.random() * 60 - 10,
          humidity: Math.random() * 100,
          timestamp: new Date().toISOString(),
          rssi: Math.floor(Math.random() * 40) - 120,
        };

        setSensorData((prev) => [newData, ...prev.slice(0, 49)]);

        checkLimitsAndGenerateAlerts(newData);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulatorRunning, limits]);

  const checkLimitsAndGenerateAlerts = (data: SensorData) => {
    const newAlerts: AlertData[] = [];

    if (
      data.temperature < limits.temperature.min ||
      data.temperature > limits.temperature.max
    ) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: "temperature",
        message: `Temperatura ${
          data.temperature < limits.temperature.min ? "abaixo" : "acima"
        } do limite`,
        value: data.temperature,
        limit:
          data.temperature < limits.temperature.min
            ? limits.temperature.min
            : limits.temperature.max,
        timestamp: new Date().toISOString(),
        severity:
          Math.abs(
            data.temperature -
              (data.temperature < limits.temperature.min
                ? limits.temperature.min
                : limits.temperature.max)
          ) > 10
            ? "critical"
            : "warning",
      });
    }

    if (
      data.humidity < limits.humidity.min ||
      data.humidity > limits.humidity.max
    ) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: "humidity",
        message: `Umidade ${
          data.humidity < limits.humidity.min ? "abaixo" : "acima"
        } do limite`,
        value: data.humidity,
        limit:
          data.humidity < limits.humidity.min
            ? limits.humidity.min
            : limits.humidity.max,
        timestamp: new Date().toISOString(),
        severity:
          Math.abs(
            data.humidity -
              (data.humidity < limits.humidity.min
                ? limits.humidity.min
                : limits.humidity.max)
          ) > 20
            ? "critical"
            : "warning",
      });
    }

    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev.slice(0, 99)]); // Manter apenas 100 alertas
    }
  };

  const toggleSimulator = () => {
    setIsSimulatorRunning(!isSimulatorRunning);
  };

  const updateLimits = () => {
    setLimits(tempLimits);
  };

  const getLatestData = () => {
    return sensorData[0] || null;
  };

  const getDeviceStatus = (rssi: number) => {
    if (rssi > -80) return { status: "Excelente", color: "bg-green-500" };
    if (rssi > -90) return { status: "Bom", color: "bg-yellow-500" };
    if (rssi > -100) return { status: "Fraco", color: "bg-orange-500" };
    return { status: "Muito Fraco", color: "bg-red-500" };
  };

  const latestData = getLatestData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Nautilus Monitor</h1>
          <p className="text-lg text-gray-600">
            Sistema de Monitoramento LoRaWAN em Tempo Real
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Emulador LoRaWAN
            </CardTitle>
            <CardDescription>
              Controle do simulador de rede LoRaWAN
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleSimulator}
                variant={isSimulatorRunning ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isSimulatorRunning ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isSimulatorRunning ? "Parar Simulador" : "Iniciar Simulador"}
              </Button>
              <Badge variant={isSimulatorRunning ? "default" : "secondary"}>
                {isSimulatorRunning ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="limits">Configuração de Limites</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temperatura
                  </CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData
                      ? `${latestData.temperature.toFixed(1)}°C`
                      : "--"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Limite: {limits.temperature.min}°C -{" "}
                    {limits.temperature.max}°C
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Umidade</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData ? `${latestData.humidity.toFixed(1)}%` : "--"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Limite: {limits.humidity.min}% - {limits.humidity.max}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Sinal LoRa
                  </CardTitle>
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData ? `${latestData.rssi} dBm` : "--"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {latestData && (
                      <Badge
                        variant="outline"
                        className={`${
                          getDeviceStatus(latestData.rssi).color
                        } text-white`}
                      >
                        {getDeviceStatus(latestData.rssi).status}
                      </Badge>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados Recentes</CardTitle>
                <CardDescription>
                  Últimas leituras dos sensores LoRaWAN
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorData.slice(0, 10).map((data) => (
                    <div
                      key={data.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{data.deviceId}</Badge>
                        <div className="text-sm">
                          <span className="font-medium">
                            {data.temperature.toFixed(1)}°C
                          </span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">
                            {data.humidity.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(data.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  {sensorData.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      Nenhum dado disponível. Inicie o simulador para começar.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuração de Limites de Operação Segura (RF06)
                </CardTitle>
                <CardDescription>
                  Defina os valores mínimos e máximos para temperatura e umidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Temperature Limits */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Temperatura</h3>
                    <div className="space-y-2">
                      <Label htmlFor="temp-min">Mínimo (°C)</Label>
                      <Input
                        id="temp-min"
                        type="number"
                        value={tempLimits.temperature.min}
                        onChange={(e) =>
                          setTempLimits((prev) => ({
                            ...prev,
                            temperature: {
                              ...prev.temperature,
                              min: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temp-max">Máximo (°C)</Label>
                      <Input
                        id="temp-max"
                        type="number"
                        value={tempLimits.temperature.max}
                        onChange={(e) =>
                          setTempLimits((prev) => ({
                            ...prev,
                            temperature: {
                              ...prev.temperature,
                              max: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Umidade</h3>
                    <div className="space-y-2">
                      <Label htmlFor="hum-min">Mínimo (%)</Label>
                      <Input
                        id="hum-min"
                        type="number"
                        value={tempLimits.humidity.min}
                        onChange={(e) =>
                          setTempLimits((prev) => ({
                            ...prev,
                            humidity: {
                              ...prev.humidity,
                              min: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hum-max">Máximo (%)</Label>
                      <Input
                        id="hum-max"
                        type="number"
                        value={tempLimits.humidity.max}
                        onChange={(e) =>
                          setTempLimits((prev) => ({
                            ...prev,
                            humidity: {
                              ...prev.humidity,
                              max: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Os limites serão aplicados em tempo real para detecção de
                    anomalias
                  </div>
                  <Button onClick={updateLimits}>Aplicar Limites</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Sistema de Alertas (RF07)
                </CardTitle>
                <CardDescription>
                  Alertas gerados automaticamente quando valores excedem os
                  limites configurados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={
                        alert.severity === "critical"
                          ? "border-red-500"
                          : "border-yellow-500"
                      }
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          alert.severity === "critical"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-muted-foreground">
                              Valor: {alert.value.toFixed(1)}
                              {alert.type === "temperature" ? "°C" : "%"} |
                              Limite: {alert.limit}
                              {alert.type === "temperature" ? "°C" : "%"}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                alert.severity === "critical"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {alert.severity === "critical"
                                ? "Crítico"
                                : "Aviso"}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                  {alerts.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      Nenhum alerta gerado. O sistema está monitorando os
                      limites configurados.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
