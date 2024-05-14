// TaskService.js

const TaskRepository = require('../repository/taskRepository');

class TaskService {
  async createTask(taskData, userId) {
    // Perform validation, data processing, etc.
    // For simplicity, let's assume validation is handled in the controller.

    // Add the user ID to the task data before creating the task
    taskData.userId = userId;

    const data = {
      title: taskData.title,
      description: taskData.description,
      dueDate: new Date(taskData.due_date),
      priority: taskData.priority,
      userId: userId
    };

    return TaskRepository.create(data);
  }

  async getTasks(filters) {
    // Perform any filtering, sorting, or additional processing here
    return TaskRepository.findMany(filters);
  }

  async getTaskById(id) {
    return TaskRepository.findOne(id);
  }

  async updateTask(id, taskData) {
    // Perform validation, data processing, etc.
    // For simplicity, let's assume validation is handled in the controller.

    const data = {
      title: taskData.title,
      description: taskData.description,
      dueDate: new Date(taskData.due_date),
      priority: taskData.priority,
      status: taskData.status
    };
    return TaskRepository.update(parseInt(id, 10), data);
  }

  async deleteTask(id) {
    return TaskRepository.delete(parseInt(id, 10));
  }
}

module.exports = new TaskService();
