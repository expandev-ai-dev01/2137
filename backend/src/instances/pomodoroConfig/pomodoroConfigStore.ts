/**
 * @summary
 * In-memory store instance for Pomodoro Configuration entity.
 * Provides singleton pattern for data storage without database.
 * Stores single configuration per user (simplified for demo).
 *
 * @module instances/pomodoroConfig/pomodoroConfigStore
 */

import { POMODORO_CONFIG_DEFAULTS } from '@/constants/pomodoroConfig';
import { v4 as uuidv4 } from 'uuid';

/**
 * Pomodoro Configuration record structure
 */
export interface PomodoroConfigRecord {
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
 * In-memory store for Pomodoro Configuration
 */
class PomodoroConfigStore {
  private config: PomodoroConfigRecord | null = null;

  /**
   * Get current configuration or create default
   */
  get(): PomodoroConfigRecord {
    if (!this.config) {
      this.config = this.createDefault();
    }
    return this.config;
  }

  /**
   * Update configuration
   */
  update(data: Partial<PomodoroConfigRecord>): PomodoroConfigRecord {
    if (!this.config) {
      this.config = this.createDefault();
    }

    this.config = {
      ...this.config,
      ...data,
      dateModified: new Date().toISOString(),
    };

    return this.config;
  }

  /**
   * Reset to default configuration
   */
  reset(): PomodoroConfigRecord {
    this.config = this.createDefault();
    return this.config;
  }

  /**
   * Check if configuration exists
   */
  exists(): boolean {
    return this.config !== null;
  }

  /**
   * Clear configuration (useful for testing)
   */
  clear(): void {
    this.config = null;
  }

  /**
   * Create default configuration
   */
  private createDefault(): PomodoroConfigRecord {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      workDuration: POMODORO_CONFIG_DEFAULTS.WORK_DURATION,
      shortBreakDuration: POMODORO_CONFIG_DEFAULTS.SHORT_BREAK_DURATION,
      longBreakDuration: POMODORO_CONFIG_DEFAULTS.LONG_BREAK_DURATION,
      cyclesBeforeLongBreak: POMODORO_CONFIG_DEFAULTS.CYCLES_BEFORE_LONG_BREAK,
      advancedConfigActive: POMODORO_CONFIG_DEFAULTS.ADVANCED_CONFIG_ACTIVE,
      customized: false,
      dateCreated: now,
      dateModified: now,
    };
  }
}

/**
 * Singleton instance of PomodoroConfigStore
 */
export const pomodoroConfigStore = new PomodoroConfigStore();
