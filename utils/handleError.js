const notify = require('gulp-notify');
const gutil = require('gulp-util');
const argv = require('yargs').argv;

const config = require('./../config');
const browserSync = require('./../tasks/browserSync').browserSync;

function formatErrorMessage(error) {
  switch (error.plugin) {
    case 'webpack-stream':
      // http://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings
      return error.message.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        '' // eslint-disable-line
      );
    default:
      return error.message;
  }
}

const browserErrorMessageStyles = {
  '.bs-pretty-message': [
    'width: 100%',
    'height: 100%',
    'display: table',
    'background-color: #fafafa',
    'color: #000',
    'position: fixed',
    'font-family: Consolas',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'padding: 1rem',
    'opacity: 1',
    'box-sizing: border-box',
    'z-index: 2147483647',
  ],

  '.bs-pretty-message__wrapper': [
    'background-color: #fafafa',
    'color: #000',
    'top: 0',
    'left: 0',
    'opacity: 0.98',
    'padding: 1rem',
    'height: 100vh',
    'box-sizing: border-box',
  ],

  '.bs-pretty-message__header': [
    'font-family: "helvetica neue, helvetica, sans-serif',
    'box-sizing: border-box',
  ],

  '.bs-pretty-message__content': [
    'font-family: Consolas, monaco, monospace',
    'box-sizing: border-box',
    'color:#cf182d',
    'overflow:auto',
  ],
};

module.exports = function handleError(error, silent, ...args) {
  // Send error to notification center with gulp-notify
  notify.onError({
    title: '<%= error.plugin %>',
    message: '<%= error.message %>',
  }).apply(this, [error, silent, ...args]);


  if (!silent && config.showErrorsInBrowser) {
    const message = formatErrorMessage(error);
    if (message) {
      browserSync.sockets.emit('fullscreen:message', {
        title: `Error in: ${error.plugin}`,
        body: message,
        styles: browserErrorMessageStyles,
      });
    }
  }

  // End process in build task
  // Use gulp build --force to override
  if (process.env.BUILD && !argv.force) {
    gutil.log(gutil.colors.red('There was an error in building process!'));
    process.exit(1);
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};
