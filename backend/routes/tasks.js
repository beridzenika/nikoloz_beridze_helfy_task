const express = require('express');

module.exports = (tasks) => {
  const router = express.Router();

  //get
  router.get('/', (req, res) => {
    res.json(tasks);
  });

  //post
  router.post('/', (req, res) => {
    const { title, description, completed, createdAt, priority } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed,
        createdAt,
        priority
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  return router;
};
