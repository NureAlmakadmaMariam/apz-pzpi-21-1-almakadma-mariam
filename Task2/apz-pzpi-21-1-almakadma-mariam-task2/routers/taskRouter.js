const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:task_id', taskController.getTaskInfo);
router.delete('/:task_id', taskController.deleteTaskById);
router.put('/:task_id', taskController.updateTask);
router.get('/users/:user_id', taskController.getAllTasksByUserId);
router.get('/departments/:department_id', taskController.getAllTasksByDepartment);
module.exports = router;