// TaskController.js

const express = require('express');
const router = express.Router();
const TaskService = require('../service/taskService');
const authMiddleware = require('../middleware/authMiddleware');

// Route to retrieve all tasks for the authenticated user
router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await TaskService.getTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to retrieve a specific task by its ID
router.get('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new task
router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an existing task by its ID
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await TaskService.updateTask(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a task by its ID
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    await TaskService.deleteTask(req.params.id, req.user.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
