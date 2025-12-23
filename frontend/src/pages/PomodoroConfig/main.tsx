/**
 * @summary
 * Pomodoro Configuration page.
 * Main page for configuring timer settings with live preview.
 *
 * @module pages/PomodoroConfig
 */

import { usePomodoroConfig } from '@/domain/pomodoroConfig/hooks/usePomodoroConfig';
import { PomodoroConfigForm } from '@/domain/pomodoroConfig/components/PomodoroConfigForm';
import { PomodoroConfigPreview } from '@/domain/pomodoroConfig/components/PomodoroConfigPreview';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { AlertCircle } from 'lucide-react';

function PomodoroConfigPage() {
  const { config, isLoading, isError } = usePomodoroConfig();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-4xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar configurações</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as configurações do timer. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurar Timer Pomodoro</h1>
        <p className="text-muted-foreground">
          Personalize as durações dos ciclos de trabalho e intervalos de descanso conforme suas
          necessidades de estudo
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <PomodoroConfigForm config={config} />
        </div>
        <div className="space-y-6">
          <PomodoroConfigPreview config={config} />
        </div>
      </div>
    </div>
  );
}

export { PomodoroConfigPage };
