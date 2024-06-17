// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const project = await Projects.add(req.body);
    res.status(201).json({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.getAll();
    res.json(projects.map(project => ({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed),
    })));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
