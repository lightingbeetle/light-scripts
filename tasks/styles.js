const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inlineSvg = require('postcss-inline-svg');

const { styles } = require('./../config.js');
const browserSync = require('./browserSync.js').browserSync;
const handleError = require('./../utils/handleError.js');
const { getFlag } = require('./../utils/flags');

const stylesTask = gulp => () => {
  let stylesError = false;
  const {
    autoprefixerCfg,
    dest,
    inlineSvgCfg,
    sassCfg,
    src,
  } = styles();

  return gulp.src(src)
    .pipe(plumber(function stylesErrorHandler(error) {
      stylesError = true;
      handleError.call(this, error);
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassCfg))
    .pipe(postcss([
      autoprefixer(autoprefixerCfg),
      inlineSvg(inlineSvgCfg),
    ].concat(process.env.NODE_ENV === 'production' ? [
      cssnano(),
    ] : [])))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
    .pipe(
      gulpif(
        () => !stylesError && getFlag('isWatch'),
        browserSync.stream({ once: true })
      )
    );
};

module.exports = {
  stylesTask,
};
