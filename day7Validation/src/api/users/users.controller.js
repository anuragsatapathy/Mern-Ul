exports.getProfile = async (req, res) => {
  // req.user was set by checkToken
  return res.json({ message: 'Protected user profile', user: req.user });
};
