const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpStylelint = require('gulp-stylelint');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inlineSvg = require('postcss-inline-svg');

const { styles: stylesConfig } = require('../config');
const { browserSync } = require('./browserSync');
const handleError = require('../utils/handleError');
const { getFlag } = require('../utils/flags');

const stylesLintTask = function stylesLint() {
  const {
    lintSrc,
    lintCfg,
  } = stylesConfig();

  return gulp.src(lintSrc)
    .pipe(plumber(handleError))
    .pipe(
      gulpif(
        getFlag('lintCSS'),
        gulpStylelint(lintCfg)
      )
    );
};

const stylesBuildTask = function stylesBuild() {
  let stylesError = false;
  const {
    autoprefixerCfg,
    dest,
    inlineSvgCfg,
    sassCfg,
    src,
  } = stylesConfig();

  return gulp.src(src)
    .pipe(plumber(function stylesErrorHandler(error) {
      stylesError = true;
      handleError.call(this, error);
    }))
    .pipe(
      gulpif(
        !getFlag('isBuild'),
        sourcemaps.init()
      )
    )
    .pipe(sass(sassCfg))
    .pipe(postcss([
      autoprefixer(autoprefixerCfg),
      inlineSvg(inlineSvgCfg),
    ].concat(process.env.NODE_ENV === 'production' ? [
      cssnano({ zindex: false }),
    ] : [])))
    .pipe(
      gulpif(
        !getFlag('isBuild'),
        sourcemaps.write()
      )
    )
    .pipe(gulp.dest(dest))
    .pipe(
      gulpif(
        () => !stylesError && getFlag('isWatch'),
        browserSync.stream({ once: true })
      )
    );
};

const stylesTask = gulp.series(
  stylesLintTask,
  stylesBuildTask
);

module.exports = {
  stylesTask,
  stylesBuildTask,
  stylesLintTask,
};
