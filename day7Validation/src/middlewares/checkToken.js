const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    // verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user object
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Invalid token - user not found' });

    req.user = user; // now controllers can access req.user
    next();
  } catch (err) {
    // token expired or invalid
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};
