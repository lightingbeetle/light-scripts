const gulp = require('gulp');

const { browserSyncTask } = require('./tasks/browserSync');
const {
  buildSizeCssTask,
  buildSizeJsTask,
  buildSizeImgTask,
  buildSizeAllTask,
  buildSizeTask,
  buildTask,
} = require('./tasks/build');
const { cacheBustTask } = require('./tasks/cacheBust');
const { cleanTask } = require('./tasks/clean');
const { copyTask } = require('./tasks/copy');
const { deployTask } = require('./tasks/deploy');
const {
  iconsTask,
  iconsAppTask,
  iconsStyleguideTask,
} = require('./tasks/icons');
const { clearCacheTask, imagesTask } = require('./tasks/images');
const { modernizrTask } = require('./tasks/modernizr');
const { scriptsTask } = require('./tasks/scripts');
const { serveTask, serveDistTask } = require('./tasks/serve');
const {
  stylesTask,
  stylesBuildTask,
  stylesLintTask,
} = require('./tasks/styles');
const {
  templatesTask,
  templatesBuildTask,
  templatesPrepareDataTask,
} = require('./tasks/templates');
const { watchTask } = require('./tasks/watch');

gulp.task('browserSync', browserSyncTask);
gulp.task('buildSizeCss', buildSizeCssTask);
gulp.task('buildSizeJs', buildSizeJsTask);
gulp.task('buildSizeImg', buildSizeImgTask);
gulp.task('buildSizeAll', buildSizeAllTask);
gulp.task('buildSize', buildSizeTask);
gulp.task('build', buildTask);
gulp.task('cacheBust', cacheBustTask);
gulp.task('clean', cleanTask);
gulp.task('copy', copyTask);
gulp.task('deploy', deployTask);
gulp.task('icons', iconsTask);
gulp.task('iconsApp', iconsAppTask);
gulp.task('iconsStyleguide', iconsStyleguideTask);
gulp.task('clearCache', clearCacheTask);
gulp.task('images', imagesTask);
gulp.task('modernizr', modernizrTask);
gulp.task('scripts', scriptsTask);
gulp.task('serve', serveTask);
gulp.task('serveDist', serveDistTask);
gulp.task('stylesLint', stylesLintTask);
gulp.task('stylesBuild', stylesBuildTask);
gulp.task('styles', stylesTask);
gulp.task('templates', templatesTask);
gulp.task('templatesBuild', templatesBuildTask);
gulp.task('templatesPrepareData', templatesPrepareDataTask);
gulp.task('watch', watchTask);
