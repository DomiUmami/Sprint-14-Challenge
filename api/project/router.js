// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const projects = await db('projects');
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get projects' });
  }
})

router.post('/', async (req, res) => {
  try {
    const { project_name, project_description } = req.body;
    if (!project_name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    const [newProject] = await db('projects').insert({ project_name, project_description, project_completed: false }, ['project_id', 'project_name', 'project_description', 'project_completed']);
    res.status(201).json({
      ...newProject,
      project_completed: !!newProject.project_completed
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project' });
  }
});

module.exports = router;
