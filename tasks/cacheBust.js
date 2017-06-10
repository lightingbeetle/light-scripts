const revAll = require('gulp-rev-all');
const { cacheBust } = require('./../config.js');

const cacheBustTask = gulp => () => {
  const { src, cfg, dest } = cacheBust();

  return gulp.src(src)
    .pipe(revAll.revision(cfg))
    .pipe(gulp.dest(dest));
};

module.exports = {
  cacheBustTask,
};
