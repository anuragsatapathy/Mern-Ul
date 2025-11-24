function success(res, data = {}, message = 'success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
}

function error(res, message = 'error', status = 500, details = null) {
  const body = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  if (details) body.details = details;
  return res.status(status).json(body);
}

module.exports = { success, error };
