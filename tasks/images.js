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
    imageminCfg,
    dest,
    optimizeImages,
    src,
  } = imagesConfig();

  return gulp.src(src)
    .pipe(gulpif(optimizeImages, cache(imagemin([
      imagemin.gifsicle(imageminCfg.gifsicle),
      imagemin.mozjpeg(imageminCfg.mozjpeg),
      imagemin.svgo(imageminCfg.svgo),
    ]))))
    .pipe(gulp.dest(dest));
};

module.exports = {
  clearCacheTask,
  imagesTask,
};
