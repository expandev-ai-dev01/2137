/**
 * @summary
 * Business logic for Pomodoro Configuration entity.
 * Handles configuration operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/pomodoroConfig/pomodoroConfigService
 */

import { POMODORO_CONFIG_DEFAULTS } from '@/constants';
import { pomodoroConfigStore } from '@/instances';
import { ServiceError } from '@/utils';
import {
  PomodoroConfigEntity,
  PomodoroConfigResponse,
  PomodoroConfigPreview,
} from './pomodoroConfigTypes';
import { configSchema } from './pomodoroConfigValidation';

/**
 * @summary
 * Retrieves current pomodoro configuration.
 * Returns default configuration if none exists.
 *
 * @function pomodoroConfigGet
 * @module services/pomodoroConfig
 *
 * @returns {Promise<PomodoroConfigResponse>} Current configuration
 *
 * @example
 * const config = await pomodoroConfigGet();
 * // Returns: { id: '...', workDuration: 25, shortBreakDuration: 5, ... }
 */
export async function pomodoroConfigGet(): Promise<PomodoroConfigResponse> {
  const config = pomodoroConfigStore.get();

  return {
    id: config.id,
    workDuration: config.workDuration,
    shortBreakDuration: config.shortBreakDuration,
    longBreakDuration: config.longBreakDuration,
    cyclesBeforeLongBreak: config.cyclesBeforeLongBreak,
    advancedConfigActive: config.advancedConfigActive,
    customized: config.customized,
    dateModified: config.dateModified,
  };
}

/**
 * @summary
 * Updates pomodoro configuration with validated data.
 *
 * @function pomodoroConfigUpdate
 * @module services/pomodoroConfig
 *
 * @param {unknown} body - Raw request body to validate against configSchema
 * @returns {Promise<PomodoroConfigResponse>} Updated configuration
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 *
 * @example
 * const updated = await pomodoroConfigUpdate({
 *   workDuration: 30,
 *   shortBreakDuration: 5,
 *   longBreakDuration: 20
 * });
 * // Returns: { id: '...', workDuration: 30, ... }
 */
export async function pomodoroConfigUpdate(body: unknown): Promise<PomodoroConfigResponse> {
  const validation = configSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  /**
   * @rule {BR-012}
   * Check if configuration differs from defaults to set customized flag
   */
  const isCustomized =
    params.workDuration !== POMODORO_CONFIG_DEFAULTS.WORK_DURATION ||
    params.shortBreakDuration !== POMODORO_CONFIG_DEFAULTS.SHORT_BREAK_DURATION ||
    params.longBreakDuration !== POMODORO_CONFIG_DEFAULTS.LONG_BREAK_DURATION ||
    params.cyclesBeforeLongBreak !== POMODORO_CONFIG_DEFAULTS.CYCLES_BEFORE_LONG_BREAK ||
    params.advancedConfigActive !== POMODORO_CONFIG_DEFAULTS.ADVANCED_CONFIG_ACTIVE;

  const updated = pomodoroConfigStore.update({
    workDuration: params.workDuration,
    shortBreakDuration: params.shortBreakDuration,
    longBreakDuration: params.longBreakDuration,
    cyclesBeforeLongBreak: params.cyclesBeforeLongBreak,
    advancedConfigActive: params.advancedConfigActive,
    customized: isCustomized,
  });

  return {
    id: updated.id,
    workDuration: updated.workDuration,
    shortBreakDuration: updated.shortBreakDuration,
    longBreakDuration: updated.longBreakDuration,
    cyclesBeforeLongBreak: updated.cyclesBeforeLongBreak,
    advancedConfigActive: updated.advancedConfigActive,
    customized: updated.customized,
    dateModified: updated.dateModified,
  };
}

/**
 * @summary
 * Resets configuration to default Pomodoro values.
 *
 * @function pomodoroConfigReset
 * @module services/pomodoroConfig
 *
 * @returns {Promise<PomodoroConfigResponse>} Reset configuration with defaults
 *
 * @example
 * const reset = await pomodoroConfigReset();
 * // Returns: { id: '...', workDuration: 25, shortBreakDuration: 5, ... }
 */
export async function pomodoroConfigReset(): Promise<PomodoroConfigResponse> {
  const reset = pomodoroConfigStore.reset();

  return {
    id: reset.id,
    workDuration: reset.workDuration,
    shortBreakDuration: reset.shortBreakDuration,
    longBreakDuration: reset.longBreakDuration,
    cyclesBeforeLongBreak: reset.cyclesBeforeLongBreak,
    advancedConfigActive: reset.advancedConfigActive,
    customized: reset.customized,
    dateModified: reset.dateModified,
  };
}

/**
 * @summary
 * Generates preview of current configuration for display.
 *
 * @function pomodoroConfigPreview
 * @module services/pomodoroConfig
 *
 * @returns {Promise<PomodoroConfigPreview>} Formatted preview strings
 *
 * @example
 * const preview = await pomodoroConfigPreview();
 * // Returns: {
 * //   workCycle: '25 minutes of work',
 * //   intervals: 'Short break: 5 min | Long break: 15 min',
 * //   cycles: 'Long break every 4 cycles'
 * // }
 */
export async function pomodoroConfigPreview(): Promise<PomodoroConfigPreview> {
  const config = pomodoroConfigStore.get();

  return {
    workCycle: `${config.workDuration} minutes of work`,
    intervals: `Short break: ${config.shortBreakDuration} min | Long break: ${config.longBreakDuration} min`,
    cycles: `Long break every ${config.cyclesBeforeLongBreak} cycles`,
  };
}
