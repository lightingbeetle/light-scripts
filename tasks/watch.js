const runSequence = require('run-sequence');

const { watch } = require('./../config.js');

// Watch source files

const watchTask = gulp => () => {
  const { styles, pug, icons } = watch();

  gulp.watch(styles, ['styles']);
  gulp.watch(pug, ['templates']);
  gulp.watch(icons, () => {
    runSequence('icons', 'templates');
  });
};

module.exports = {
  watchTask,
};
