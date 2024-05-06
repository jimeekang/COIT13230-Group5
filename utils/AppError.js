class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('2') ? 'sucesss' : 'failed';
    this.stack;
    Error.captureStackTrace(this);
  }
}

module.exports = AppError;
