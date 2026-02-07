const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  // 1 = connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database not connected. Start MongoDB or set MONGODB_URI.' });
  }
  next();
};
