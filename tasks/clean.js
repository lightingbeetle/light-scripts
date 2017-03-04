const del = require('del');

const { clean } = require('./../config.js');

// Cleaning task

const cleanTask = () => del.bind(null, clean());

module.exports = {
  cleanTask,
};
