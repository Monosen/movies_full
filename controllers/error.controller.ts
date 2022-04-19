import { NextFunction, Request, Response } from 'express'

import { AppError } from '../util/appError'

// err -> AppError
const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  err.statusCode = (!isNaN(err.statusCode) && err.statusCode !== 0) ? err.statusCode : 500
  err.status = typeof err.status === 'number' ? err.status : 'fail'

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

export { globalErrorHandler }
