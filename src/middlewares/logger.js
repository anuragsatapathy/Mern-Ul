module.exports = function logger(req, res, next) {
  const start = Date.now();
  const ts = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${ts}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
