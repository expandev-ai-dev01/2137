/**
 * @summary
 * Form type definitions for Pomodoro Configuration.
 * Derived from Zod validation schemas.
 *
 * @module domain/pomodoroConfig/types/forms
 */

import { z } from 'zod';
import { pomodoroConfigSchema } from '../validations/pomodoroConfig';

export type PomodoroConfigFormInput = z.input<typeof pomodoroConfigSchema>;
export type PomodoroConfigFormOutput = z.output<typeof pomodoroConfigSchema>;
