/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as pomodoroConfigController from '@/api/internal/pomodoro-config/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Pomodoro Configuration routes - /api/internal/pomodoro-config
 */
router.get('/pomodoro-config', pomodoroConfigController.getHandler);
router.put('/pomodoro-config', pomodoroConfigController.updateHandler);
router.post('/pomodoro-config/reset', pomodoroConfigController.resetHandler);
router.get('/pomodoro-config/preview', pomodoroConfigController.previewHandler);

export default router;
