// build your `Project` model here
const db = require('../../data/dbConfig');

function add(project) {
  return db('project').insert(project).returning('*').then(rows => rows[0]);
}

function getAll() {
  return db('project');
}

module.exports = {
  add,
  getAll,
};
