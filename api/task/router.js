// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const task = await Tasks.add(req.body);
    res.status(201).json({
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: Boolean(task.task_completed),
      project_id: task.project_id,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Tasks.getAll();
    res.json(tasks.map(task => ({
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: Boolean(task.task_completed),
      project_name: task.project_name,
      project_description: task.project_description,
    })));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
