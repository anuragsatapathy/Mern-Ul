const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const validateQuery = require('../../middlewares/validateQuery');
const { taskQuery } = require('../../validation/querySchemas');

// Routes
router.get('/', validateQuery(taskQuery), taskController.listTasks);
router.get('/:id', taskController.getTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
