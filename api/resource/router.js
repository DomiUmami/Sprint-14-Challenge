// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const resource = await Resources.add(req.body);
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const resources = await Resources.getAll();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
