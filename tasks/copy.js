const { copy } = require('./../config.js');

const copyTask = gulp => () => {
  const { src, cfg, dest } = copy();

  return gulp.src(src, cfg)
    .pipe(gulp.dest(dest));
};

module.exports = {
  copyTask,
};
