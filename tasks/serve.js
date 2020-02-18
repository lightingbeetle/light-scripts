const { setFlag } = require('./../utils/flags');

const { iconsTask } = require('./icons');
const { stylesTask } = require('./styles');
const { scriptsTask } = require('./scripts');
const { templatesTask } = require('./templates');
const { modernizrTask } = require('./modernizr');
const { browserSyncTask } = require('./browserSync');
const { watchTask } = require('./watch');
const { buildTask } = require('./build');

// Serve project with watching and livereload
const serveTask = (gulp) => {
  setFlag({ isWatch: true });

  return gulp.series(
    iconsTask(gulp),
    gulp.parallel(
      stylesTask(gulp),
      scriptsTask(gulp),
      templatesTask(gulp)
    ),
    modernizrTask(gulp),
    browserSyncTask(gulp),
    watchTask(gulp)
  );
};

const serveDistTask = (gulp) => gulp.series(
  buildTask(gulp),
  browserSyncTask(gulp)
);

module.exports = {
  serveTask,
  serveDistTask,
};
