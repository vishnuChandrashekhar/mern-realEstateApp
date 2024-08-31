import { Request, Response, NextFunction } from 'express';

export interface ErrorObject {
  success: boolean,
  statusCode: number,
  message: string
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const errorResponse: ErrorObject = {
    success: false,
    statusCode,
    message
  }

  res.status(statusCode).json(errorResponse);
}

export function throwError(statusCode: number, message: string) {
  const error = new Error(message) as Error & { statusCode?: number }
  error.message = message,
  error.statusCode = statusCode

  return error
}