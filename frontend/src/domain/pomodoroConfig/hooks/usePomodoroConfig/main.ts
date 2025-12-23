/**
 * @summary
 * Custom hook for managing Pomodoro Configuration.
 * Provides query and mutation operations with React Query.
 *
 * @module domain/pomodoroConfig/hooks/usePomodoroConfig
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pomodoroConfigService } from '../../services/pomodoroConfigService';
import type { PomodoroConfigFormOutput } from '../../types/forms';
import { toast } from 'sonner';

const QUERY_KEY = ['pomodoroConfig'];

export const usePomodoroConfig = () => {
  const queryClient = useQueryClient();

  const { data: config, ...queryInfo } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: pomodoroConfigService.get,
  });

  const { data: preview } = useQuery({
    queryKey: [...QUERY_KEY, 'preview'],
    queryFn: pomodoroConfigService.getPreview,
    enabled: !!config,
  });

  const { mutateAsync: updateConfig, isPending: isUpdating } = useMutation({
    mutationFn: (data: PomodoroConfigFormOutput) => pomodoroConfigService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Configurações salvas com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao salvar configurações. Tente novamente.');
    },
  });

  const { mutateAsync: resetConfig, isPending: isResetting } = useMutation({
    mutationFn: pomodoroConfigService.reset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Configurações restauradas para os valores padrão!');
    },
    onError: () => {
      toast.error('Erro ao restaurar configurações. Tente novamente.');
    },
  });

  return {
    config,
    preview,
    updateConfig,
    resetConfig,
    isUpdating,
    isResetting,
    ...queryInfo,
  };
};
