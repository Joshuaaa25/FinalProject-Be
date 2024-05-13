// TaskRepository.js

const { task } = require('@prisma/client');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TaskRepository {
  async create(taskData) {
    return prisma.task.create({ data: taskData });
  }

  async findMany(filters) {
    // Add logic for filtering, sorting, etc.
    return prisma.task.findMany({
      where: {
        userId: filters
      }
    });
  }

  async findOne(id) {
    return prisma.task.findUnique({
      where: {
        id: parseInt(id, 10)
      }
    });
  }

  async update(id, taskData) {
    return prisma.task.update({ where: { id }, data: taskData });
  }

  async delete(id) {
    return prisma.task.delete({ where: { id } });
  }
}

module.exports = new TaskRepository();
