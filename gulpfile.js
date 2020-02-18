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
const { iconsTask, iconsAppTask, iconsStyleguideTask } = require('./tasks/icons');
const { clearCacheTask, imagesTask } = require('./tasks/images');
const { modernizrTask } = require('./tasks/modernizr');
const { scriptsTask } = require('./tasks/scripts');
const { serveTask, serveDistTask } = require('./tasks/serve');
const { stylesTask, stylesBuildTask, stylesLintTask } = require('./tasks/styles');
const { templatesTask, templatesBuildTask, templatesPrepareDataTask } = require('./tasks/templates');
const { watchTask } = require('./tasks/watch');

gulp.task('browserSync', browserSyncTask(gulp));
gulp.task('buildSizeCss', buildSizeCssTask(gulp));
gulp.task('buildSizeJs', buildSizeJsTask(gulp));
gulp.task('buildSizeImg', buildSizeImgTask(gulp));
gulp.task('buildSizeAll', buildSizeAllTask(gulp));
gulp.task('buildSize', buildSizeTask(gulp));
gulp.task('build', buildTask(gulp));
gulp.task('cacheBust', cacheBustTask(gulp));
gulp.task('clean', cleanTask());
gulp.task('copy', copyTask(gulp));
gulp.task('deploy', deployTask(gulp));
gulp.task('icons', iconsTask(gulp));
gulp.task('iconsApp', iconsAppTask(gulp));
gulp.task('iconsStyleguide', iconsStyleguideTask(gulp));
gulp.task('clearCache', clearCacheTask(gulp));
gulp.task('images', imagesTask(gulp));
gulp.task('modernizr', modernizrTask(gulp));
gulp.task('scripts', scriptsTask());
gulp.task('serve', serveTask(gulp));
gulp.task('serveDist', serveDistTask(gulp));
gulp.task('stylesLint', stylesLintTask(gulp));
gulp.task('stylesBuild', stylesBuildTask(gulp));
gulp.task('styles', stylesTask(gulp));
gulp.task('templates', templatesTask(gulp));
gulp.task('templatesBuild', templatesBuildTask(gulp));
gulp.task('templatesPrepareData', templatesPrepareDataTask(gulp));
gulp.task('watch', watchTask(gulp));
