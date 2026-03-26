const validateTask = (req, res, next) => {
  const { title, priority } = req.body
  const validPriorities = ['low', 'medium', 'high']

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' })
  }

  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' })
  }

  const allowedFields = ['title', 'description', 'priority'];
  const hasInvalidFields = Object.keys(req.body).some(key => !allowedFields.includes(key));

  if (hasInvalidFields) {
    return res.status(400).json({ error: 'Only title, description, and priority can be used' });
  }

  next()
}

const validateTaskUpdate = (req, res, next) => {
  const { title, priority, description } = req.body;
  const validPriorities = ['low', 'medium', 'high'];

  const allowedFields = ['title', 'description', 'priority'];
  const invalidFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));

  if (invalidFields.length > 0) {
    return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(', ')}` });
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }

  next();
};

module.exports = { validateTaskUpdate, validateTask }