const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:task_id', taskController.getTaskInfo);

module.exports = router;