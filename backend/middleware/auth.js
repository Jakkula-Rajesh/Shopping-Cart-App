const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and verify token matches
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if token in request matches token in DB
    if (user.token !== token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
