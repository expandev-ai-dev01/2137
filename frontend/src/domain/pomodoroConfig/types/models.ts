/**
 * @summary
 * Type definitions for Pomodoro Configuration domain.
 * Represents the configuration data structure from backend API.
 *
 * @module domain/pomodoroConfig/types/models
 */

export interface PomodoroConfig {
  id: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  advancedConfigActive: boolean;
  customized: boolean;
  dateModified: string;
}

export interface PomodoroConfigPreview {
  workCycle: string;
  intervals: string;
  cycles: string;
}
