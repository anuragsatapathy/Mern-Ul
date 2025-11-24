const express = require('express');
const router = express.Router();
const studentController = require('./student.controller');
const validateQuery = require('../../middlewares/validateQuery');
const { studentQuery } = require('../../validation/querySchemas');

router.get('/', validateQuery(studentQuery), studentController.listStudents);
router.get('/:id', studentController.getStudent);
router.delete('/:id', studentController.softDeleteStudent); // soft delete

module.exports = router;
