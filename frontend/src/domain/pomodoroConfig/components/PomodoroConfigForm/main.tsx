/**
 * @summary
 * Form component for configuring Pomodoro timer settings.
 * Implements all validation rules and user interactions from specification.
 *
 * @module domain/pomodoroConfig/components/PomodoroConfigForm
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pomodoroConfigSchema } from '../../validations/pomodoroConfig';
import type { PomodoroConfigFormInput, PomodoroConfigFormOutput } from '../../types/forms';
import type { PomodoroConfigFormProps } from './types';
import { usePomodoroConfig } from '../../hooks/usePomodoroConfig';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';
import { Switch } from '@/core/components/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/core/components/alert';
import { useEffect } from 'react';

function PomodoroConfigForm({ config, onSuccess }: PomodoroConfigFormProps) {
  const { updateConfig, resetConfig, isUpdating, isResetting } = usePomodoroConfig();

  const form = useForm<PomodoroConfigFormInput, unknown, PomodoroConfigFormOutput>({
    resolver: zodResolver(pomodoroConfigSchema),
    mode: 'onBlur',
    defaultValues: {
      workDuration: config?.workDuration ?? 25,
      shortBreakDuration: config?.shortBreakDuration ?? 5,
      longBreakDuration: config?.longBreakDuration ?? 15,
      cyclesBeforeLongBreak: config?.cyclesBeforeLongBreak ?? 4,
      advancedConfigActive: config?.advancedConfigActive ?? false,
    },
  });

  const advancedConfigActive = form.watch('advancedConfigActive');

  useEffect(() => {
    if (config) {
      form.reset({
        workDuration: config.workDuration,
        shortBreakDuration: config.shortBreakDuration,
        longBreakDuration: config.longBreakDuration,
        cyclesBeforeLongBreak: config.cyclesBeforeLongBreak,
        advancedConfigActive: config.advancedConfigActive,
      });
    }
  }, [config, form]);

  const onSubmit = async (data: PomodoroConfigFormOutput) => {
    await updateConfig(data);
    onSuccess?.();
  };

  const handleReset = async () => {
    await resetConfig();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Tempo</CardTitle>
            <CardDescription>
              Personalize as durações dos ciclos de trabalho e intervalos de descanso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="workDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de Trabalho (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={60}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Duração do ciclo de trabalho/estudo (1-60 minutos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortBreakDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intervalo Curto (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Duração do intervalo curto entre ciclos (1-10 minutos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longBreakDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intervalo Longo (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={15}
                      max={30}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Duração do intervalo longo após múltiplos ciclos (15-30 minutos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Avançadas</CardTitle>
            <CardDescription>
              Personalize o número de ciclos antes do intervalo longo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="advancedConfigActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Habilitar Configurações Avançadas</FormLabel>
                    <FormDescription>
                      Permite personalizar o número de ciclos antes do intervalo longo
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {advancedConfigActive && (
              <>
                <Separator />
                <FormField
                  control={form.control}
                  name="cyclesBeforeLongBreak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciclos antes do Intervalo Longo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={2}
                          max={8}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Número de ciclos de trabalho antes de ativar o intervalo longo (2-8 ciclos)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {!advancedConfigActive && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Usando valor padrão: 4 ciclos antes do intervalo longo (técnica Pomodoro
                  tradicional)
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isResetting || isUpdating}
          >
            <RotateCcw />
            Restaurar Padrões
          </Button>
          <Button type="submit" disabled={isUpdating || isResetting}>
            {isUpdating ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { PomodoroConfigForm };
