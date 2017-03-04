const svgstore = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');

const { icons } = require('./../config.js');
const handleError = require('./../utils/handleError.js');

// App icons
const iconsAppTask = gulp => () => {
  const {
    srcApp,
    iconPrefix,
    cheerioCfg,
    imageminCfg,
    dest,
  } = icons();

  return gulp
    .src(srcApp)
    .pipe(rename({ prefix: iconPrefix }))
    .pipe(cheerio(cheerioCfg))
    .pipe(imagemin(imageminCfg))
    .pipe(svgstore())
    .pipe(gulp.dest(dest))
    .on('error', handleError);
};


// Styleguide icons
const iconsStyleguideTask = gulp => () => {
  const {
    srcStyleguide,
    iconPrefix,
    cheerioCfg,
    imageminCfg,
    dest,
  } = icons();

  return gulp
    .src(srcStyleguide)
    .pipe(rename({ prefix: `${iconPrefix}sg-` }))
    .pipe(cheerio(cheerioCfg))
    .pipe(imagemin(imageminCfg))
    .pipe(svgstore())
    .pipe(gulp.dest(dest))
    .on('error', handleError);
};

module.exports = {
  iconsAppTask,
  iconsStyleguideTask,
};
