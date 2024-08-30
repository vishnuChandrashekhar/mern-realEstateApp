import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
}

export function throwError(statusCode: number, message: string) {
  const error = new Error(message) as Error & { statusCode?: number }
  error.message = message,
  error.statusCode = statusCode

  return error
}