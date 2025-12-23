/**
 * @summary
 * Validation schemas for Pomodoro Configuration entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/pomodoroConfig/pomodoroConfigValidation
 */

import { z } from 'zod';
import { POMODORO_CONFIG_LIMITS, POMODORO_CONFIG_DEFAULTS } from '@/constants';

/**
 * Schema for configuration create/update request validation
 */
export const configSchema = z
  .object({
    workDuration: z
      .number()
      .int()
      .min(POMODORO_CONFIG_LIMITS.WORK_DURATION_MIN)
      .max(POMODORO_CONFIG_LIMITS.WORK_DURATION_MAX),
    shortBreakDuration: z
      .number()
      .int()
      .min(POMODORO_CONFIG_LIMITS.SHORT_BREAK_MIN)
      .max(POMODORO_CONFIG_LIMITS.SHORT_BREAK_MAX),
    longBreakDuration: z
      .number()
      .int()
      .min(POMODORO_CONFIG_LIMITS.LONG_BREAK_MIN)
      .max(POMODORO_CONFIG_LIMITS.LONG_BREAK_MAX),
    cyclesBeforeLongBreak: z
      .number()
      .int()
      .min(POMODORO_CONFIG_LIMITS.CYCLES_MIN)
      .max(POMODORO_CONFIG_LIMITS.CYCLES_MAX)
      .optional()
      .default(POMODORO_CONFIG_DEFAULTS.CYCLES_BEFORE_LONG_BREAK),
    advancedConfigActive: z.boolean().optional().default(false),
  })
  .refine((data) => data.longBreakDuration > data.shortBreakDuration, {
    message: 'Long break duration must be greater than short break duration',
    path: ['longBreakDuration'],
  });

/**
 * Inferred types from schemas
 */
export type ConfigInput = z.infer<typeof configSchema>;
