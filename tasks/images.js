const gulp = require('gulp');
const cache = require('gulp-cache');
const gulpif = require('gulp-if');

const { images: imagesConfig } = require('./../config.js');

// Clear imagemin cache
const clearCacheTask = function clearCache() {
  return cache.clearAll();
};

// Optimize images
const imagesTask = function images() {
  const { imageminCfg, dest, optimizeImages, src } = imagesConfig();

  return import('gulp-imagemin').then(
    (imagemin) =>
      console.log(imagemin) ||
      gulp
        .src(src)
        .pipe(
          gulpif(
            optimizeImages,
            cache(
              imagemin.default([
                imagemin.gifsicle(imageminCfg.gifsicle),
                imagemin.mozjpeg(imageminCfg.mozjpeg),
                imagemin.svgo(imageminCfg.svgo),
              ])
            )
          )
        )
        .pipe(gulp.dest(dest))
  );
};

module.exports = {
  clearCacheTask,
  imagesTask,
};
