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
        createdAt: new Date().toISOString(),
        completed: false,
        priority
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  //update
  router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({error: 'Task not found:('});
    }
    tasks[index] = {id, ...tasks[index], ...req.body};
    res.json(tasks[index]);
  });

  //delete
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({error: 'Task not found:('});
    }
    tasks.splice(index, 1);
    res.json({message: 'Task deleted'});
  });

  //toggle
  router.patch('/:id/toggle', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found :(' });
    }
    tasks[index].completed = !tasks[index].completed;
    res.json(tasks[index]);
  });

  return router;
};
