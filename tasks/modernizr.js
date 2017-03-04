const modernizr = require('gulp-modernizr');

const { modernizr: modernizrCfg } = require('./../config.js');

// Lean Modernizr build
const modernizrTask = gulp => () => {
  const { src, cfg, dest } = modernizrCfg();

  return gulp.src(src)
    .pipe(modernizr(cfg))
    .pipe(gulp.dest(dest));
};

module.exports = {
  modernizrTask,
};
