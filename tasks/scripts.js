const gutil = require('gulp-util');

const webpack = require('webpack');
const _ = require('lodash');

const { scripts: scriptsConfig } = require('./../config.js');
const { getFlag } = require('./../utils/flags');
const handleError = require('./../utils/handleError.js');
const { browserSync } = require('./browserSync');

let firstRun = true;

const scriptsTask = () => function scripts(done) {
  const webpackConfig = _.omit(scriptsConfig(), 'babelConfig');

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      handleError.call(this, err);
    }

    // if errors, print these
    if (stats.toJson().errors.length) {
      const gErr = new gutil.PluginError({
        plugin: 'webpack',
        message: stats.toJson().errors[0],
      });
      handleError.call(this, gErr);
    } else {
      // otherwise print bundle stats
      gutil.log(stats.toString({
        colors: gutil.colors.supportsColor,
        chunks: false,
        errors: false,
      }));
      // end reload
      browserSync.reload();
    }

    if (getFlag('isWatch') && firstRun) {
      firstRun = false;
      done();
    } else if (!getFlag('isWatch')) {
      done();
    }
  });
};

module.exports = {
  scriptsTask,
};
