/**
 * @summary
 * Type definitions for PomodoroConfigForm component.
 *
 * @module domain/pomodoroConfig/components/PomodoroConfigForm/types
 */

import type { PomodoroConfig } from '../../types/models';

export interface PomodoroConfigFormProps {
  config?: PomodoroConfig;
  onSuccess?: () => void;
}
