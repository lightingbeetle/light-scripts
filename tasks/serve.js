let runSequence = require('run-sequence');
const { setFlag } = require('./../utils/flags');

// Serve project with watching and livereload
const serveTask = gulp => (done) => {
  setFlag({ isWatch: true });
  runSequence = runSequence.use(gulp);

  runSequence(
    ['icons'],
    ['styles', 'scripts', 'templates'],
    'modernizr',
    'browser-sync',
    'watch',
    done // eslint-disable-line
  );
};

const serveDistTask = gulp => (done) => {
  runSequence = runSequence.use(gulp);

  runSequence(
    'build',
    'browser-sync',
    done // eslint-disable-line
  );
};

module.exports = {
  serveTask,
  serveDistTask,
};
