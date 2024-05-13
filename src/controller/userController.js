// UserController.js

const express = require('express');
const router = express.Router();
const UserService = require('../service/userService');
const authMiddleware = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/users', async (req, res) => {
  try {
    const user = await UserService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to login an existing user
router.post('/users/login', async (req, res) => {
  try {
    const token = await UserService.loginUser(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Route to retrieve user profile
router.get('/users/profile', authMiddleware, async (req, res) => {
  try {
    const userProfile = await UserService.getUserProfile(req.user.id);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update user profile
router.put('/users/profile', authMiddleware, async (req, res) => {
  try {
    const updatedUserProfile = await UserService.updateUserProfile(
      req.user.id,
      req.body
    );
    res.json(updatedUserProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
