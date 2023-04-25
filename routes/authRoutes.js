const express = require('express');
const passport = require('passport');
const router = express.Router();
const connection = require('../db');

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully.' });
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully.' });
});

// Get current user route
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized.' });
  }
});

module.exports = router;
