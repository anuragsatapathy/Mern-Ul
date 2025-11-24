
const { Task } = require('../../models/task.model');
const { Student } = require('../../models/student.model');
const { success } = require('../../utility/responses');

async function countUsers(req, res, next) {
  try {
    const total = await Student.countDocuments({});
    return success(res, { total }, 'Total students');
  } catch (err) { next(err); }
}

async function countTasksPerUser(req, res, next) {
  try {
    const agg = await Task.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $group: { _id: '$owner', count: { $sum: 1 } } },
      { $lookup: { from: 'students', localField: '_id', foreignField: '_id', as: 'student' } },
      { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } },
      { $project: { studentId: '$_id', studentName: '$student.name', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    return success(res, agg, 'Tasks per student');
  } catch (err) { next(err); }
}

async function activeInactiveUsers(req, res, next) {
  try {
    const agg = await Student.aggregate([
      { $group: { _id: '$isActive', count: { $sum: 1 } } },
      { $project: { isActive: '$_id', count: 1, _id: 0 } }
    ]);
    return success(res, agg, 'Active / inactive students');
  } catch (err) { next(err); }
}

module.exports = { countUsers, countTasksPerUser, activeInactiveUsers };
