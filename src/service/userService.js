// UserService.js

const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

class UserService {
  async registerUser(userData) {
    // Perform validation, password hashing, etc.
    // For simplicity, let's assume validation is handled in the controller.
    return UserRepository.create(userData);
  }

  async loginUser(credentials) {
    // Authenticate user, generate JWT token, etc.
    // For simplicity, let's assume authentication is handled in the controller.
    const user = await UserRepository.findByCredentials(credentials);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
  }

  async updateUserProfile(userId, userData) {
    return UserRepository.update(userId, userData);
  }
}

module.exports = new UserService();
