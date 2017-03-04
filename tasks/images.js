const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const gulpif = require('gulp-if');

const { images } = require('./../config.js');

// Clear imagemin cache
const clearCacheTask = () => done => cache.clearAll(done);

// Optimize images
const imagesTask = gulp => () => {
  const {
    cfg,
    dest,
    optimizeImages,
    src,
  } = images();

  return gulp.src(src)
    .pipe(gulpif(optimizeImages, cache(imagemin(cfg))))
    .pipe(gulp.dest(dest));
};

module.exports = {
  clearCacheTask,
  imagesTask,
};
