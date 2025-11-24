const express = require('express');
const router = express.Router();
const agg = require('./aggregate.controller');

router.get('/users/count', agg.countUsers);
router.get('/tasks/per-user', agg.countTasksPerUser);
router.get('/users/active-inactive', agg.activeInactiveUsers);

module.exports = router;
