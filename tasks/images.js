const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const gulpif = require('gulp-if');

const { images: imagesConfig } = require('./../config.js');

// Clear imagemin cache
const clearCacheTask = () => function clearCache() {
  return cache.clearAll();
};

// Optimize images
const imagesTask = (gulp) => function images() {
  const {
    cfg,
    dest,
    optimizeImages,
    src,
  } = imagesConfig();

  return gulp.src(src)
    .pipe(gulpif(optimizeImages, cache(imagemin(cfg))))
    .pipe(gulp.dest(dest));
};

module.exports = {
  clearCacheTask,
  imagesTask,
};
