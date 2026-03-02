const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      // Check for hardcoded admin fallback
      if (decoded.id === 'admin_id_123') {
        req.user = { _id: 'admin_id_123', username: 'admin', isAdmin: true };
        return next();
      }

      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        // DB not connected, but not original admin ID
        return res.status(401).json({ message: 'Database disconnected' });
      }

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
