const browserSyncLib = require('browser-sync').create();

const { browserSync: browserSyncConfig } = require('./../config.js');

browserSyncLib.emitter.on('stream:changed', () => {
  browserSyncLib.sockets.emit('fullscreen:message:clear');
});

// Serve project with livereload
const browserSyncTask = function browserSync(done) {
  browserSyncLib.init(browserSyncConfig(), done);
};

module.exports = {
  reload: browserSyncLib.reload,
  browserSync: browserSyncLib,
  browserSyncTask,
};
