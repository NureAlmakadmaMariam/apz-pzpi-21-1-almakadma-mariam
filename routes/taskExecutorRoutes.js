const express = require('express');
const router = express.Router();
const taskExecutorController = require('../controllers/taskExecutorController');


router.post('/', taskExecutorController.createTaskExecutor);
router.get('/', taskExecutorController.getAllTaskExecutors);
router.get('/:task_id', taskExecutorController.getTaskExecutorsByTaskId);
router.delete('/task/:task_id/executor/:executor_id', taskExecutorController.deleteTaskExecutor);

module.exports = router;
