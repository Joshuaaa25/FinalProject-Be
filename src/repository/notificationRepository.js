const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NotificationRepository {
  static async getUserNotificationSettings(userId) {
    // Retrieve notification settings for the specified user from the database
    const userSettings = await prisma.notificationSettings.findUnique({
      where: { userId }
    });
    return userSettings;
  }
}

module.exports = NotificationRepository;
