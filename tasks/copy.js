const { copy: copyConfig } = require('./../config.js');

const copyTask = (gulp) => function copy() {
  const { src, cfg, dest } = copyConfig();

  return gulp.src(src, cfg)
    .pipe(gulp.dest(dest));
};

module.exports = {
  copyTask,
};
