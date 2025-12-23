/**
 * @summary
 * Preview component displaying current Pomodoro configuration.
 * Shows formatted preview of work cycles, intervals, and cycle settings.
 *
 * @module domain/pomodoroConfig/components/PomodoroConfigPreview
 */

import type { PomodoroConfigPreviewProps } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { Clock, Coffee, Timer } from 'lucide-react';
import { Skeleton } from '@/core/components/skeleton';

function PomodoroConfigPreview({ config }: PomodoroConfigPreviewProps) {
  if (!config) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visualização das Configurações</CardTitle>
          <CardDescription>Carregando configurações...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização das Configurações</CardTitle>
        <CardDescription>Resumo das suas configurações atuais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="hover:bg-accent/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="bg-primary/10 size-10 flex shrink-0 items-center justify-center rounded-lg">
            <Clock className="text-primary size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Ciclo de Trabalho</p>
            <p className="text-muted-foreground text-sm">
              {config.workDuration} minutos de trabalho
            </p>
          </div>
        </div>

        <div className="hover:bg-accent/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="bg-primary/10 size-10 flex shrink-0 items-center justify-center rounded-lg">
            <Coffee className="text-primary size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Intervalos de Descanso</p>
            <p className="text-muted-foreground text-sm">
              Intervalo curto: {config.shortBreakDuration} min | Intervalo longo:{' '}
              {config.longBreakDuration} min
            </p>
          </div>
        </div>

        <div className="hover:bg-accent/50 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="bg-primary/10 size-10 flex shrink-0 items-center justify-center rounded-lg">
            <Timer className="text-primary size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Configuração de Ciclos</p>
            <p className="text-muted-foreground text-sm">
              Intervalo longo a cada {config.cyclesBeforeLongBreak} ciclos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { PomodoroConfigPreview };
