const gulp = require('gulp');
const rsync = require('gulp-rsync');
const plumber = require('gulp-plumber');

const { deploy: deployConfig } = require('./../config.js');
const handleError = require('./../utils/handleError.js');

// Deploying via rsync/sftp
// Credentials are stored in .env file

// TODO plumber not working with this
const deployTask = function deploy() {
  const { src, cfg } = deployConfig();

  return gulp.src(src)
    .pipe(plumber(handleError))
    .pipe(rsync(cfg));
};

module.exports = {
  deployTask,
};
