const gulp = require('gulp');
const { watch: watchConfig } = require('./../config.js');
const { stylesTask } = require('./styles');
const { templatesTask } = require('./templates');
const { iconsTask } = require('./icons');

// Watch source files

const watchTask = function watch() {
  const { styles, pug, icons } = watchConfig();

  gulp.watch(styles, gulp.series(stylesTask));
  gulp.watch(pug, gulp.series(templatesTask));
  gulp.watch(icons, gulp.series(iconsTask, templatesTask));
};

module.exports = {
  watchTask,
};
