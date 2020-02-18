const del = require('del');

const { clean: cleanConfig } = require('./../config.js');

// Cleaning task
const cleanTask = () => async function clean(done) {
  await del(cleanConfig(), { force: true }, done);
};

module.exports = {
  cleanTask,
};
