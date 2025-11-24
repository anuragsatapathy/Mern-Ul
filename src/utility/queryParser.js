function applyQueryFeatures(modelQuery, rawQuery = {}) {
  const q = { ...rawQuery };
  const reserved = ['page', 'limit', 'sort', 'select', 'search'];

  // SEARCH 
  if (q.search) {
    const regex = new RegExp(q.search, 'i');
    modelQuery = modelQuery.find({
      $or: [
        { name: regex },
        { title: regex },
        { email: regex },
        { description: regex }
      ]
    });
  }

  // FILTER 
  const filters = {};
  Object.keys(q).forEach((k) => {
    if (!reserved.includes(k)) filters[k] = q[k];
  });
  if (Object.keys(filters).length) modelQuery = modelQuery.find(filters);

  // SORT
  if (q.sort) modelQuery = modelQuery.sort(q.sort.split(',').join(' '));
  else modelQuery = modelQuery.sort('-createdAt');

  // SELECT
  if (q.select) modelQuery = modelQuery.select(q.select.split(',').join(' '));

  // PAGINATION
  const page = Math.max(parseInt(q.page || 1, 10), 1);
  const limit = Math.max(parseInt(q.limit || 10, 10), 1);
  const skip = (page - 1) * limit;
  modelQuery = modelQuery.skip(skip).limit(limit);

  const meta = { page, limit, skip };
  return { modelQuery, meta };
}

module.exports = { applyQueryFeatures };
