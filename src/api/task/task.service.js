const { Task } = require('../../models/task.model');

async function findTasks(query) {
  return query.exec();
}

async function countTasks(filter = {}) {
  return Task.countDocuments(filter);
}

module.exports = { findTasks, countTasks, Task };
