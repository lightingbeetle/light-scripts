const gulp = require('gulp');
const { copy: copyConfig } = require('./../config.js');

const copyTask = function copy() {
  const { src, cfg, dest } = copyConfig();

  return gulp.src(src, cfg)
    .pipe(gulp.dest(dest));
};

module.exports = {
  copyTask,
};
