// build your server here and require it from index.js
const express = require('express');

const resourcesRouter = require('./resource/router');
const projectsRouter = require('./project/router');
const tasksRouter = require('./task/router');

const server = express();
server.use(express.json());

server.use('/api/resource', resourcesRouter);
server.use('/api/project', projectsRouter);
server.use('/api/task', tasksRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: "up" })
});

module.exports = server;
