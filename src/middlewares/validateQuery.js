const CustomError = require('../utility/CustomError');

function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details.map(d => d.message);
      return next(new CustomError('Invalid query parameters', 400, details));
    }
    req.validatedQuery = value;
    next();
  };
}

module.exports = validateQuery;
