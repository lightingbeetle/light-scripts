const gulp = require('gulp');
const size = require('gulp-size');
const notifier = require('node-notifier');
const { argv } = require('yargs');
const { setFlag } = require('./../utils/flags.js');

const { buildSize: buildSizeConfig } = require('./../config.js');

const { cleanTask } = require('./clean');
const { iconsTask } = require('./icons');
const { stylesTask } = require('./styles');
const { scriptsTask } = require('./scripts');
const { imagesTask } = require('./images');
const { copyTask } = require('./copy');
const { templatesTask } = require('./templates');
const { modernizrTask } = require('./modernizr');
const { cacheBustTask } = require('./cacheBust');

// Output size of dist folder
const buildSizeCssTask = function buildSizeCss() {
  const { css } = buildSizeConfig();

  return gulp.src(css.src)
    .pipe(size(css.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeJsTask = function buildSizeJs() {
  const { js } = buildSizeConfig();

  return gulp.src(js.src)
    .pipe(size(js.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeImgTask = function buildSizeImg() {
  const { img } = buildSizeConfig();

  return gulp.src(img.src)
    .pipe(size(img.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeAllTask = function buildSizeAll() {
  const { all } = buildSizeConfig();

  return gulp.src(all.src)
    .pipe(size(all.gulpSizeConfig));
};

const buildSizeTask = function buildSize() {
  return gulp.series(
    gulp.parallel(
      buildSizeCssTask,
      buildSizeJsTask,
      buildSizeImgTask
    ),
    buildSizeAllTask
  );
};

const notifyTask = function notify(done) {
  return notifier.notify({
    title: 'Build',
    message: 'Build was successful',
    timeout: 5,
  }, () => {
    done();
  });
};

function setBuildVars(done) {
  process.env.NODE_ENV = argv.dev ? 'development' : 'production';
  setFlag({ isBuild: true });
  done();
}

// run build in sequence - this shoud be implemented in Gulp 4 natively
const buildTask = gulp.series(
  setBuildVars,
  cleanTask,
  iconsTask,
  gulp.parallel(
    stylesTask,
    scriptsTask,
    imagesTask,
    copyTask,
    templatesTask
  ),
  modernizrTask,
  cacheBustTask,
  buildSizeAllTask,
  notifyTask
);

module.exports = {
  buildTask,
  buildSizeTask,
  buildSizeAllTask,
  buildSizeCssTask,
  buildSizeJsTask,
  buildSizeImgTask,
};
