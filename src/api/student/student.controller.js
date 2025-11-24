const { Student } = require('../../models/student.model');
const { applyQueryFeatures } = require('../../utility/queryParser');
const { success } = require('../../utility/responses');

async function listStudents(req, res, next) {
  try {
    const rawQuery = req.validatedQuery || req.query;
    // only active students by default
    const base = Student.find({ isActive: true });
    const { modelQuery, meta } = applyQueryFeatures(base, rawQuery);
    const items = await modelQuery.lean().exec();
    const total = await Student.countDocuments({ isActive: true });
    return success(res, { items, meta: { ...meta, total } }, 'Students fetched');
  } catch (err) {
    next(err);
  }
}

async function getStudent(req, res, next) {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id, isActive: true }).lean().exec();
    if (!student) {
      const e = new Error('Student not found');
      e.status = 404;
      throw e;
    }
    return success(res, student, 'Student fetched');
  } catch (err) {
    next(err);
  }
}

async function softDeleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await Student.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean().exec();
    if (!updated) {
      const e = new Error('Student not found');
      e.status = 404;
      throw e;
    }
    return success(res, updated, 'Student soft-deleted');
  } catch (err) {
    next(err);
  }
}

module.exports = { listStudents, getStudent, softDeleteStudent };
