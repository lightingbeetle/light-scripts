const svgstore = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');

const { icons: iconsConfig } = require('./../config.js');
const handleError = require('./../utils/handleError.js');

// App icons
const iconsAppTask = (gulp) => function iconsApp() {
  const {
    srcApp,
    iconPrefix,
    cheerioCfg,
    imageminCfg,
    dest,
  } = iconsConfig();

  return gulp
    .src(srcApp)
    .pipe(rename({ prefix: iconPrefix }))
    .pipe(cheerio(cheerioCfg))
    .pipe(imagemin([
      imagemin.svgo(imageminCfg.svgo),
    ]))
    .pipe(svgstore())
    .pipe(gulp.dest(dest))
    .on('error', handleError);
};

// Styleguide icons
const iconsStyleguideTask = (gulp) => function iconsStyleguide() {
  const {
    srcStyleguide,
    iconPrefix,
    cheerioCfg,
    imageminCfg,
    dest,
  } = iconsConfig();

  return gulp
    .src(srcStyleguide)
    .pipe(rename({ prefix: `${iconPrefix}sg-` }))
    .pipe(cheerio(cheerioCfg))
    .pipe(imagemin([
      imagemin.svgo(imageminCfg.svgo),
    ]))
    .pipe(svgstore())
    .pipe(gulp.dest(dest))
    .on('error', handleError);
};

const iconsTask = (gulp) => gulp.parallel(
  iconsAppTask(gulp),
  iconsStyleguideTask(gulp)
);

module.exports = {
  iconsTask,
  iconsAppTask,
  iconsStyleguideTask,
};
