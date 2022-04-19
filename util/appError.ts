class AppError extends Error {
  statusCode: number
  status: string
  constructor (statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    Error.captureStackTrace(this, this.constructor)
  }
}

export { AppError }
