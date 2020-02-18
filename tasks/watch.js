const { watch: watchConfig } = require('./../config.js');
const { stylesTask } = require('./styles');
const { templatesTask } = require('./templates');
const { iconsTask } = require('./icons');

// Watch source files

const watchTask = (gulp) => function watch() {
  const { styles, pug, icons } = watchConfig();

  gulp.watch(styles, gulp.series(stylesTask(gulp)));
  gulp.watch(pug, gulp.series(templatesTask(gulp)));
  gulp.watch(icons, gulp.series(iconsTask(gulp), templatesTask(gulp)));
};

module.exports = {
  watchTask,
};
