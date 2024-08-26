const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/ScheduleController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/tasks', authMiddleware, scheduleController.getTasks);
router.post('/tasks', authMiddleware, scheduleController.addTask);
router.delete('/tasks/:id', authMiddleware, scheduleController.deleteTask);

module.exports = router;
