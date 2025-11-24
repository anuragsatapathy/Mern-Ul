const CustomError = require('../utility/CustomError');
const { error: errorResponse } = require('../utility/responses');

function errorMiddleware(err, req, res, next) {
  if (res.headersSent) return next(err);

  // Mongoose validation
  if (err && err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(e => e.message);
    return errorResponse(res, 'Validation error', 400, details);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err && err.name === 'CastError') {
    return errorResponse(res, 'Invalid id format', 400, err.message);
  }

  // Custom error
  if (err instanceof CustomError) {
    return errorResponse(res, err.message, err.status, err.details);
  }

  // Generic fallback
  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Internal server error';
  return errorResponse(res, message, status, err && err.details ? err.details : null);
}

module.exports = errorMiddleware;
