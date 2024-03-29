const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');

const { icons: iconsConfig } = require('./../config.js');
const handleError = require('./../utils/handleError.js');

// App icons
const iconsAppTask = function iconsApp() {
  const { srcApp, iconPrefix, cheerioCfg, imageminCfg, dest } = iconsConfig();

  return import('gulp-imagemin').then((imagemin) =>
    gulp
      .src(srcApp)
      .pipe(rename({ prefix: iconPrefix }))
      .pipe(cheerio(cheerioCfg))
      .pipe(imagemin.default([imagemin.svgo(imageminCfg.svgo)]))
      .pipe(svgstore())
      .pipe(gulp.dest(dest))
      .on('error', handleError)
  );
};

// Styleguide icons
const iconsStyleguideTask = function iconsStyleguide() {
  const { srcStyleguide, iconPrefix, cheerioCfg, imageminCfg, dest } =
    iconsConfig();

  return import('gulp-imagemin').then((imagemin) =>
    gulp
      .src(srcStyleguide)
      .pipe(rename({ prefix: `${iconPrefix}sg-` }))
      .pipe(cheerio(cheerioCfg))
      .pipe(imagemin.default([imagemin.svgo(imageminCfg.svgo)]))
      .pipe(svgstore())
      .pipe(gulp.dest(dest))
      .on('error', handleError)
  );
};

const iconsTask = gulp.parallel(
  iconsAppTask,
  iconsStyleguideTask
);

module.exports = {
  iconsTask,
  iconsAppTask,
  iconsStyleguideTask,
};
