const browserSync = require('browser-sync').create();

const { browserSync: browserSyncConfig } = require('./../config.js');

browserSync.emitter.on('stream:changed', () => {
  browserSync.sockets.emit('fullscreen:message:clear');
});

// Serve project with livereload
const browserSyncTask = () => () => {
  browserSync.init(browserSyncConfig());
};

module.exports = {
  reload: browserSync.reload,
  browserSync,
  browserSyncTask,
};
