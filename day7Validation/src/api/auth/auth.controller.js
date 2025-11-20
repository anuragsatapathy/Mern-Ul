const authService = require('./auth.service');

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    //error handling
    return res.status(err.status || 400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
};
