/**
 * @summary
 * Type definitions for Pomodoro Configuration entity.
 *
 * @module services/pomodoroConfig/pomodoroConfigTypes
 */

/**
 * @interface PomodoroConfigEntity
 * @description Represents a pomodoro configuration entity
 *
 * @property {string} id - Unique configuration identifier (UUID)
 * @property {number} workDuration - Work session duration in minutes
 * @property {number} shortBreakDuration - Short break duration in minutes
 * @property {number} longBreakDuration - Long break duration in minutes
 * @property {number} cyclesBeforeLongBreak - Number of cycles before long break
 * @property {boolean} advancedConfigActive - Whether advanced config is enabled
 * @property {boolean} customized - Whether user has customized from defaults
 * @property {string} dateCreated - ISO 8601 timestamp of creation
 * @property {string} dateModified - ISO 8601 timestamp of last modification
 */
export interface PomodoroConfigEntity {
  id: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  advancedConfigActive: boolean;
  customized: boolean;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface PomodoroConfigCreateRequest
 * @description Request payload for creating/updating pomodoro configuration
 *
 * @property {number} workDuration - Work session duration in minutes (1-60)
 * @property {number} shortBreakDuration - Short break duration in minutes (1-10)
 * @property {number} longBreakDuration - Long break duration in minutes (15-30)
 * @property {number} [cyclesBeforeLongBreak] - Cycles before long break (2-8, optional)
 * @property {boolean} [advancedConfigActive] - Enable advanced config (optional)
 */
export interface PomodoroConfigCreateRequest {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak?: number;
  advancedConfigActive?: boolean;
}

/**
 * @interface PomodoroConfigResponse
 * @description Response structure for configuration retrieval
 *
 * @property {string} id - Configuration identifier
 * @property {number} workDuration - Work session duration in minutes
 * @property {number} shortBreakDuration - Short break duration in minutes
 * @property {number} longBreakDuration - Long break duration in minutes
 * @property {number} cyclesBeforeLongBreak - Cycles before long break
 * @property {boolean} advancedConfigActive - Advanced config state
 * @property {boolean} customized - Whether customized from defaults
 * @property {string} dateModified - Last modification timestamp
 */
export interface PomodoroConfigResponse {
  id: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  advancedConfigActive: boolean;
  customized: boolean;
  dateModified: string;
}

/**
 * @interface PomodoroConfigPreview
 * @description Preview structure for configuration display
 *
 * @property {string} workCycle - Formatted work cycle preview
 * @property {string} intervals - Formatted intervals preview
 * @property {string} cycles - Formatted cycles preview
 */
export interface PomodoroConfigPreview {
  workCycle: string;
  intervals: string;
  cycles: string;
}
