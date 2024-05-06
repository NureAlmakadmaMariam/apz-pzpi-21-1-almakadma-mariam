const express = require('express');
const router = express.Router();
const taskExecutorController = require('../controllers/taskExecutorController');

// Create task executor
router.post('/', taskExecutorController.createTaskExecutor);

// Get all task executors
router.get('/', taskExecutorController.getAllTaskExecutors);

// Get all task executors by task_id
router.get('/:task_id', taskExecutorController.getTaskExecutorsByTaskId);

module.exports = router;
