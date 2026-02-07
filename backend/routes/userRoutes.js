const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const checkDb = require('../middleware/checkDb');

// POST /users - Create a new user
router.post('/', checkDb, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// GET /users - List all users
router.get('/', checkDb, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// POST /users/login - Login user
router.post('/login', checkDb, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if user is already logged in on another device
    if (user.token) {
      return res.status(403).json({ message: 'You cannot login on another device.' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Save token to user record
    user.token = token;
    await user.save();

    res.json({ token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// POST /users/logout - Logout user
router.post('/logout', checkDb, auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out', error: err.message });
  }
});

module.exports = router;
