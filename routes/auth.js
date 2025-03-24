const express = require('express');
const router = express.Router();
const auth = require('../Inter/authentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'your_jwt_secret'; // In production, use environment variables
// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const userId = await User.create(username, password);// Create new user
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });   // Create token
    // Set cookie for token
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password or username' });
    }
    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    
    // Set cookie for token
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  try {
    const users = await User.searchUsers(query, req.user.id);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;