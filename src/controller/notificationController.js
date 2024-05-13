const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const NotificationService = require('../service/notificationService');

// Route to send notifications to users
router.post('/notifications/send', authMiddleware, async (req, res) => {
  try {
    await NotificationService.sendNotifications();
    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to retrieve notification settings
router.get('/notifications/settings', authMiddleware, async (req, res) => {
  try {
    const settings = await NotificationService.getNotificationSettings(
      req.user.id
    );
    res
      .status(200)
      .json({
        settings,
        message: 'Notification settings retrieved successfully'
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
