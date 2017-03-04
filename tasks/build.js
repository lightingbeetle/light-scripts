let runSequence = require('run-sequence');
const size = require('gulp-size');
const notifier = require('node-notifier');
const argv = require('yargs').argv;
const flags = require('./../utils/flags.js');

const { buildSize } = require('./../config.js');

// Output size of dist folder
const buildSizeCssTask = gulp => () => {
  const { cssSrc, cssCfg } = buildSize();

  return gulp.src(cssSrc)
    .pipe(size(cssCfg));
};

// Output size of dist folder
const buildSizeJsTask = gulp => () => {
  const { jsSrc, jsCfg } = buildSize();

  return gulp.src(jsSrc)
    .pipe(size(jsCfg));
};

// Output size of dist folder
const buildSizeImgTask = gulp => () => {
  const { imgSrc, imgCfg } = buildSize();

  return gulp.src(imgSrc)
    .pipe(size(imgCfg));
};

// Output size of dist folder
const buildSizeTask = gulp => () => {
  const { allSrc, allCfg } = buildSize();

  return gulp.src(allSrc)
    .pipe(size(allCfg));
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
    'buildSize',
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
