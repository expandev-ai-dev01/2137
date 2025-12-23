/**
 * @summary
 * Zod validation schema for Pomodoro Configuration form.
 * Implements all validation rules from feature specification.
 *
 * @module domain/pomodoroConfig/validations/pomodoroConfig
 */

import { z } from 'zod';

export const pomodoroConfigSchema = z
  .object({
    workDuration: z
      .number('A duração do trabalho é obrigatória')
      .min(1, 'A duração do trabalho deve estar entre 1 e 60 minutos')
      .max(60, 'A duração do trabalho deve estar entre 1 e 60 minutos'),
    shortBreakDuration: z
      .number('A duração do intervalo curto é obrigatória')
      .min(1, 'O intervalo curto deve estar entre 1 e 10 minutos')
      .max(10, 'O intervalo curto deve estar entre 1 e 10 minutos'),
    longBreakDuration: z
      .number('A duração do intervalo longo é obrigatória')
      .min(15, 'O intervalo longo deve estar entre 15 e 30 minutos')
      .max(30, 'O intervalo longo deve estar entre 15 e 30 minutos'),
    cyclesBeforeLongBreak: z
      .number('O número de ciclos é obrigatório')
      .min(2, 'O número de ciclos deve estar entre 2 e 8')
      .max(8, 'O número de ciclos deve estar entre 2 e 8')
      .default(4),
    advancedConfigActive: z.boolean().default(false),
  })
  .refine((data) => data.longBreakDuration > data.shortBreakDuration, {
    message: 'O intervalo longo deve ser maior que o intervalo curto',
    path: ['longBreakDuration'],
  });
