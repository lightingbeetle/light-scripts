const gulp = require('gulp');

const { browserSyncTask } = require('./tasks/browserSync');
const {
  buildSizeCssTask,
  buildSizeJsTask,
  buildSizeImgTask,
  buildSizeTask,
  buildTask,
} = require('./tasks/build');
const { cacheBustTask } = require('./tasks/cacheBust');
const { cleanTask } = require('./tasks/clean');
const { copyTask } = require('./tasks/copy');
const { deployTask } = require('./tasks/deploy');
const { iconsAppTask, iconsStyleguideTask } = require('./tasks/icons');
const { clearCacheTask, imagesTask } = require('./tasks/images');
const { modernizrTask } = require('./tasks/modernizr');
const { scriptsTask } = require('./tasks/scripts');
const { serveTask, serveDistTask } = require('./tasks/serve');
const { stylesTask, stylesLintTask } = require('./tasks/styles');
const { templatesTask, templatesPrepareDataTask } = require('./tasks/templates');
const { watchTask } = require('./tasks/watch');

gulp.task('browser-sync', [], browserSyncTask(gulp));

gulp.task('build-size:css', [], buildSizeCssTask(gulp));
gulp.task('build-size:js', [], buildSizeJsTask(gulp));
gulp.task('build-size:img', [], buildSizeImgTask(gulp));
gulp.task('build-size', [
  'build-size:css',
  'build-size:js',
  'build-size:img',
], buildSizeTask(gulp));
gulp.task('build', [], buildTask(gulp));

gulp.task('cache-bust', [], cacheBustTask(gulp));

gulp.task('clean', [], cleanTask(gulp));

gulp.task('copy', [], copyTask(gulp));

gulp.task('default', [], () => {});

gulp.task('deploy', [], deployTask(gulp));

gulp.task('icons', ['icons-app', 'icons-styleguide'], () => {});
gulp.task('icons-app', [], iconsAppTask(gulp));
gulp.task('icons-styleguide', [], iconsStyleguideTask(gulp));

gulp.task('clear-cache', [], clearCacheTask(gulp));
gulp.task('images', [], imagesTask(gulp));

gulp.task('modernizr', [], modernizrTask(gulp));

gulp.task('scripts', [], scriptsTask(gulp));

gulp.task('serve', [], serveTask(gulp));
gulp.task('serve:dist', [], serveDistTask(gulp));

gulp.task('styles:lint', [], stylesLintTask(gulp));
gulp.task('styles', ['styles:lint'], stylesTask(gulp));

gulp.task('templates', ['templates:prepare-data'], templatesTask(gulp));
gulp.task('templates:prepare-data', [], templatesPrepareDataTask(gulp));

gulp.task('watch', [], watchTask(gulp));
