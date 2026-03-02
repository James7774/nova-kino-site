const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
const authUser = async (req, res) => {
  const { username, password } = req.body;

  // Temporary fallback for local development without MongoDB
  if (username === 'admin' && password === 'admin123') {
    return res.json({
      _id: 'admin_id_123',
      username: 'admin',
      isAdmin: true,
      token: generateToken('admin_id_123'),
    });
  }

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error / Database disconnected' });
  }
};

module.exports = { authUser };
