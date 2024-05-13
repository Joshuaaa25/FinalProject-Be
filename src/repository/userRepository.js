// UserRepository.js

const { user } = require('@prisma/client');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class UserRepository {
  async create(userData) {
    // Hash password before storing in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return prisma.user.create({
      data: { ...userData, password: hashedPassword }
    });
  }

  async findByCredentials(credentials) {
    const user = await prisma.user.findUnique({
      where: { username: credentials.username }
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    return user;
  }

  async update(id, userData) {
    return prisma.user.update({ where: { id }, data: userData });
  }
}

module.exports = new UserRepository();
