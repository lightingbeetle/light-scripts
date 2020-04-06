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
const buildSizeCssTask = (gulp) => function buildSizeCss() {
  const { css } = buildSizeConfig();

  return gulp.src(css.src)
    .pipe(size(css.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeJsTask = (gulp) => function buildSizeJs() {
  const { js } = buildSizeConfig();

  return gulp.src(js.src)
    .pipe(size(js.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeImgTask = (gulp) => function buildSizeImg() {
  const { img } = buildSizeConfig();

  return gulp.src(img.src)
    .pipe(size(img.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeAllTask = (gulp) => function buildSizeAll() {
  const { all } = buildSizeConfig();

  return gulp.src(all.src)
    .pipe(size(all.gulpSizeConfig));
};

const buildSizeTask = (gulp) => function buildSize() {
  return gulp.series(
    gulp.parallel(
      buildSizeCssTask(gulp),
      buildSizeJsTask(gulp),
      buildSizeImgTask(gulp)
    ),
    buildSizeAllTask(gulp)
  );
};

const notifyTask = () => function notify(done) {
  notifier.notify({
    title: 'Build',
    message: 'Build was successful',
  });
  done();
};

// run build in sequence - this shoud be implemented in Gulp 4 natively
const buildTask = (gulp) => {
  process.env.NODE_ENV = argv.dev ? 'development' : 'production';
  setFlag({ isBuild: true });

  return gulp.series(
    cleanTask(),
    iconsTask(gulp),
    gulp.parallel(
      stylesTask(gulp),
      scriptsTask(gulp),
      imagesTask(gulp),
      copyTask(gulp),
      templatesTask(gulp)
    ),
    modernizrTask(gulp),
    cacheBustTask(gulp),
    buildSizeAllTask(gulp),
    notifyTask()
  );
};

module.exports = {
  buildTask,
  buildSizeTask,
  buildSizeAllTask,
  buildSizeCssTask,
  buildSizeJsTask,
  buildSizeImgTask,
};
