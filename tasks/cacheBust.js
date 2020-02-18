const revAll = require('gulp-rev-all');
const { cacheBust: cacheBustConfig } = require('./../config.js');

const cacheBustTask = (gulp) => function cacheBust() {
  const { src, cfg, dest } = cacheBustConfig();

  return gulp.src(src)
    .pipe(revAll.revision(cfg))
    .pipe(gulp.dest(dest));
};

module.exports = {
  cacheBustTask,
};
