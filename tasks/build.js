let runSequence = require('run-sequence');
const size = require('gulp-size');
const notifier = require('node-notifier');
const argv = require('yargs').argv;
const flags = require('./../utils/flags.js');

const { buildSize } = require('./../config.js');

// Output size of dist folder
const buildSizeCssTask = gulp => () => {
  const { css } = buildSize();

  return gulp.src(css.src)
    .pipe(size(css.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeJsTask = gulp => () => {
  const { js } = buildSize();

  return gulp.src(js.src)
    .pipe(size(js.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeImgTask = gulp => () => {
  const { img } = buildSize();

  return gulp.src(img.src)
    .pipe(size(img.gulpSizeConfig));
};

// Output size of dist folder
const buildSizeTask = gulp => () => {
  const { all } = buildSize();

  return gulp.src(all.src)
    .pipe(size(all.gulpSizeConfig));
};

// run build in sequence - this shoud be implemented in Gulp 4 natively
const buildTask = gulp => (done) => {
  process.env.NODE_ENV = argv.dev ? 'development' : 'production';
  flags.setFlag({ isBuild: true });

  runSequence = runSequence.use(gulp);

  runSequence(
    ['clean'],
    ['icons'],
    ['styles', 'scripts', 'images', 'copy', 'templates'],
    ['modernizr'],
    'cache-bust',
    'build-size',
    () => {
      notifier.notify({
        title: 'Build',
        message: 'Build was successful',
      });
      done();
    }
  );
};

module.exports = {
  buildTask,
  buildSizeTask,
  buildSizeCssTask,
  buildSizeJsTask,
  buildSizeImgTask,
};
