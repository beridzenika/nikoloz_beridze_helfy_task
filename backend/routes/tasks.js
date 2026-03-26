const express = require('express');
const { validateTaskUpdate, validateTask } = require('../middlewere/validate');
module.exports = (tasks) => {
  const router = express.Router();
  let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  //get
  router.get('/', (req, res) => {
    res.json(tasks);
  });

  //post
  router.post('/', validateTask, (req, res) => {
    const { title, description, priority } = req.body;

    const newTask = {
        id: nextId,
        title,
        description,
        createdAt: new Date().toISOString(),
        completed: false,
        priority: priority || 'middle'
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  //update
  router.put('/:id', validateTaskUpdate, (req, res) => {
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
