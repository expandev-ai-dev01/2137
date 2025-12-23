/**
 * @service PomodoroConfigService
 * @domain pomodoroConfig
 * @type REST
 *
 * @summary
 * Service layer for Pomodoro Configuration API operations.
 * Handles all HTTP requests to backend /api/internal/pomodoro-config endpoints.
 *
 * @module domain/pomodoroConfig/services/pomodoroConfigService
 */

import { authenticatedClient } from '@/core/lib/api';
import type { PomodoroConfig, PomodoroConfigPreview } from '../types/models';
import type { PomodoroConfigFormOutput } from '../types/forms';

export const pomodoroConfigService = {
  /**
   * Get current Pomodoro configuration
   * @returns Promise<PomodoroConfig>
   */
  async get(): Promise<PomodoroConfig> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: PomodoroConfig }>(
      '/pomodoro-config'
    );
    return data.data;
  },

  /**
   * Update Pomodoro configuration
   * @param config - Configuration data to update
   * @returns Promise<PomodoroConfig>
   */
  async update(config: PomodoroConfigFormOutput): Promise<PomodoroConfig> {
    const { data } = await authenticatedClient.put<{ success: boolean; data: PomodoroConfig }>(
      '/pomodoro-config',
      config
    );
    return data.data;
  },

  /**
   * Reset configuration to default values
   * @returns Promise<PomodoroConfig>
   */
  async reset(): Promise<PomodoroConfig> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: PomodoroConfig }>(
      '/pomodoro-config/reset'
    );
    return data.data;
  },

  /**
   * Get configuration preview (formatted strings)
   * @returns Promise<PomodoroConfigPreview>
   */
  async getPreview(): Promise<PomodoroConfigPreview> {
    const { data } = await authenticatedClient.get<{
      success: boolean;
      data: PomodoroConfigPreview;
    }>('/pomodoro-config/preview');
    return data.data;
  },
};
