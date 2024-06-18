// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const db = require('../../data/dbConfig');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await db('projects');
    const formattedProjects = projects.map(project => ({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed) // Convert project_completed to boolean
    }));
    res.status(200).json(formattedProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    const { project_name, project_description } = req.body;
    if (!project_name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    const [newProject] = await db('projects').insert({
      project_name,
      project_description,
      project_completed: false // Assuming project_completed defaults to false
    }, ['project_id', 'project_name', 'project_description', 'project_completed']);
    res.status(201).json({
      project_id: newProject.project_id,
      project_name: newProject.project_name,
      project_description: newProject.project_description,
      project_completed: Boolean(newProject.project_completed) // Convert project_completed to boolean
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

module.exports = router;