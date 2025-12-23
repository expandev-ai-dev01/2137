/**
 * @summary
 * Default values and constants for Pomodoro Timer Configuration.
 * Provides centralized configuration for timer durations, cycle limits,
 * and validation constraints following traditional Pomodoro technique.
 *
 * @module constants/pomodoroConfig/pomodoroConfigDefaults
 */

/**
 * @interface PomodoroConfigDefaultsType
 * @description Default configuration values for Pomodoro timer
 *
 * @property {number} WORK_DURATION - Default work session duration in minutes (25)
 * @property {number} SHORT_BREAK_DURATION - Default short break duration in minutes (5)
 * @property {number} LONG_BREAK_DURATION - Default long break duration in minutes (15)
 * @property {number} CYCLES_BEFORE_LONG_BREAK - Default cycles before long break (4)
 * @property {boolean} ADVANCED_CONFIG_ACTIVE - Default advanced config state (false)
 */
export const POMODORO_CONFIG_DEFAULTS = {
  /** Default work session duration in minutes */
  WORK_DURATION: 25,
  /** Default short break duration in minutes */
  SHORT_BREAK_DURATION: 5,
  /** Default long break duration in minutes */
  LONG_BREAK_DURATION: 15,
  /** Default number of cycles before long break */
  CYCLES_BEFORE_LONG_BREAK: 4,
  /** Default state for advanced configuration */
  ADVANCED_CONFIG_ACTIVE: false,
} as const;

/** Type representing the POMODORO_CONFIG_DEFAULTS constant */
export type PomodoroConfigDefaultsType = typeof POMODORO_CONFIG_DEFAULTS;

/**
 * @interface PomodoroConfigLimitsType
 * @description Validation constraints for Pomodoro configuration fields
 *
 * @property {number} WORK_DURATION_MIN - Minimum work duration in minutes (1)
 * @property {number} WORK_DURATION_MAX - Maximum work duration in minutes (60)
 * @property {number} SHORT_BREAK_MIN - Minimum short break duration in minutes (1)
 * @property {number} SHORT_BREAK_MAX - Maximum short break duration in minutes (10)
 * @property {number} LONG_BREAK_MIN - Minimum long break duration in minutes (15)
 * @property {number} LONG_BREAK_MAX - Maximum long break duration in minutes (30)
 * @property {number} CYCLES_MIN - Minimum cycles before long break (2)
 * @property {number} CYCLES_MAX - Maximum cycles before long break (8)
 */
export const POMODORO_CONFIG_LIMITS = {
  WORK_DURATION_MIN: 1,
  WORK_DURATION_MAX: 60,
  SHORT_BREAK_MIN: 1,
  SHORT_BREAK_MAX: 10,
  LONG_BREAK_MIN: 15,
  LONG_BREAK_MAX: 30,
  CYCLES_MIN: 2,
  CYCLES_MAX: 8,
} as const;

/** Type representing the POMODORO_CONFIG_LIMITS constant */
export type PomodoroConfigLimitsType = typeof POMODORO_CONFIG_LIMITS;
