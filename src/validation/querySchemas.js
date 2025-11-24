const Joi = require('joi');

const baseQuery = {
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(200).optional(),
  search: Joi.string().min(1).optional(),
  sort: Joi.string().optional(),
  select: Joi.string().optional()
};

const studentQuery = Joi.object(baseQuery);
const taskQuery = Joi.object(baseQuery);

module.exports = { studentQuery, taskQuery };
