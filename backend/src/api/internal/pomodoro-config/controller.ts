/**
 * @summary
 * API controller for Pomodoro Configuration entity.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/pomodoro-config/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  pomodoroConfigGet,
  pomodoroConfigUpdate,
  pomodoroConfigReset,
  pomodoroConfigPreview,
} from '@/services/pomodoroConfig';

/**
 * @api {get} /api/internal/pomodoro-config Get Configuration
 * @apiName GetPomodoroConfig
 * @apiGroup PomodoroConfig
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Configuration identifier (UUID)
 * @apiSuccess {Number} data.workDuration Work session duration in minutes
 * @apiSuccess {Number} data.shortBreakDuration Short break duration in minutes
 * @apiSuccess {Number} data.longBreakDuration Long break duration in minutes
 * @apiSuccess {Number} data.cyclesBeforeLongBreak Cycles before long break
 * @apiSuccess {Boolean} data.advancedConfigActive Advanced config enabled
 * @apiSuccess {Boolean} data.customized Whether customized from defaults
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp of last modification
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await pomodoroConfigGet();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/pomodoro-config Update Configuration
 * @apiName UpdatePomodoroConfig
 * @apiGroup PomodoroConfig
 *
 * @apiBody {Number} workDuration Work duration in minutes (1-60)
 * @apiBody {Number} shortBreakDuration Short break duration in minutes (1-10)
 * @apiBody {Number} longBreakDuration Long break duration in minutes (15-30)
 * @apiBody {Number} [cyclesBeforeLongBreak] Cycles before long break (2-8, optional)
 * @apiBody {Boolean} [advancedConfigActive] Enable advanced config (optional)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Configuration identifier (UUID)
 * @apiSuccess {Number} data.workDuration Work session duration in minutes
 * @apiSuccess {Number} data.shortBreakDuration Short break duration in minutes
 * @apiSuccess {Number} data.longBreakDuration Long break duration in minutes
 * @apiSuccess {Number} data.cyclesBeforeLongBreak Cycles before long break
 * @apiSuccess {Boolean} data.advancedConfigActive Advanced config enabled
 * @apiSuccess {Boolean} data.customized Whether customized from defaults
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp of last modification
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await pomodoroConfigUpdate(req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/pomodoro-config/reset Reset to Defaults
 * @apiName ResetPomodoroConfig
 * @apiGroup PomodoroConfig
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Configuration identifier (UUID)
 * @apiSuccess {Number} data.workDuration Work session duration (25 minutes)
 * @apiSuccess {Number} data.shortBreakDuration Short break duration (5 minutes)
 * @apiSuccess {Number} data.longBreakDuration Long break duration (15 minutes)
 * @apiSuccess {Number} data.cyclesBeforeLongBreak Cycles before long break (4)
 * @apiSuccess {Boolean} data.advancedConfigActive Advanced config enabled (false)
 * @apiSuccess {Boolean} data.customized Whether customized (false)
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp of reset
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function resetHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await pomodoroConfigReset();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/pomodoro-config/preview Get Configuration Preview
 * @apiName PreviewPomodoroConfig
 * @apiGroup PomodoroConfig
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.workCycle Formatted work cycle preview
 * @apiSuccess {String} data.intervals Formatted intervals preview
 * @apiSuccess {String} data.cycles Formatted cycles preview
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function previewHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await pomodoroConfigPreview();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
