const gulp = require('gulp');
const { setFlag } = require('../utils/flags');
const { iconsTask } = require('./icons');
const { stylesTask } = require('./styles');
const { scriptsTask } = require('./scripts');
const { templatesTask } = require('./templates');
const { modernizrTask } = require('./modernizr');
const { browserSyncTask } = require('./browserSync');
const { watchTask } = require('./watch');
const { buildTask } = require('./build');

function setServeVars(done) {
  setFlag({ isWatch: true });
  done();
}

// Serve project with watching and livereload
const serveTask = gulp.series(
  setServeVars,
  iconsTask,
  gulp.parallel(
    stylesTask,
    scriptsTask,
    templatesTask
  ),
  modernizrTask,
  browserSyncTask,
  watchTask
);


const serveDistTask = gulp.series(
  buildTask,
  browserSyncTask
);

module.exports = {
  serveTask,
  serveDistTask,
};
