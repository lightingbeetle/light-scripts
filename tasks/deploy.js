const rsync = require('gulp-rsync');
const plumber = require('gulp-plumber');

const { deploy } = require('./../config.js');
const handleError = require('./../utils/handleError.js');

// Deploying via rsync/sftp
// Credentials are stored in .env file

// TODO plumber not working with this
const deployTask = gulp => () => {
  const { src, cfg } = deploy();

  return gulp.src(src)
    .pipe(plumber(handleError))
    .pipe(rsync(cfg));
};

module.exports = {
  deployTask,
};
