const { Task } = require('../../models/task.model');
const { applyQueryFeatures } = require('../../utility/queryParser');
const { success } = require('../../utility/responses');

async function listTasks(req, res, next) {
  try {
    const rawQuery = req.validatedQuery || req.query;
   
    const base = Task.find({ isDeleted: { $ne: true } });

    const { modelQuery, meta } = applyQueryFeatures(base, rawQuery);

    // populate owner minimally, use lean for faster reads
    const items = await modelQuery.populate('owner', 'name').lean().exec();

    // Compute total count for meta (filtered by isDeleted false)
    const total = await Task.countDocuments({ isDeleted: { $ne: true } });

    return success(res, { items, meta: { ...meta, total } }, 'Tasks fetched');
  } catch (err) {
    next(err);
  }
}

async function getTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, isDeleted: { $ne: true } })
      .populate('owner', 'name')
      .lean()
      .exec();

    if (!task) {
      const e = new Error('Task not found');
      e.status = 404;
      throw e;
    }
    return success(res, task, 'Task fetched');
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean().exec();
    if (!updated) {
      const e = new Error('Task not found');
      e.status = 404;
      throw e;
    }
    return success(res, updated, 'Task soft-deleted');
  } catch (err) {
    next(err);
  }
}

module.exports = { listTasks, getTask, deleteTask };
