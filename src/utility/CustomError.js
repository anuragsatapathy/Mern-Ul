class CustomError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
