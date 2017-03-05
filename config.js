const path = require('path');
const fs = require('fs');
const glob = require('glob');
const modRewrite = require('connect-modrewrite');
const pug = require('pug');
const webpack = require('webpack');
const bsPrettyMessage = require('bs-pretty-message');
const _ = require('lodash');
const flags = require('./utils/flags');

const { getFlag } = flags;
const cwd = process.cwd();
const pkg = require(path.join(cwd, 'package.json')); // eslint-disable-line import/no-dynamic-require

const browserSync = ({ app, dist, tmp }, { browserSync: config = {} }) => () => {
  // Rewrite rules enables removing .html extensions in development.
  // This are possible routes for same test.html file:
  // http://localhost:3000/test.html
  // http://localhost:3000/test
  const defaultRewriteRules = [
    '^/$ - [L]', // default site root handling (index.html)
    '.html$ - [L]', // ignore routes ends with '.html'
    '(.*)/$ $1/index.html [L]', // routes with trailing slash are directories -> rewrite to directory index.html
    '\\/[a-zA-Z0-9_\\-@.]+\\.[a-zA-Z0-9]+$ - [L]', // ignore files with extension (eg. .css, .js, ...)
    '(.*)$ $1.html [L]', // redirect routes ends with string without trailing slash to original html
  ];

  const { plugins = [], rewriteRules = [] } = config;
  const otherConfig = _.omit(config, ['plugins', 'rewriteRules']);

  const defaultConfig = {
    server: {
      baseDir: getFlag('isBuild') ? dist : [tmp, app],
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite([...defaultRewriteRules, ...rewriteRules]),
    ],
    plugins: [
      ...plugins,
    ].concat(process.env.NODE_ENV === 'development' ? [
      bsPrettyMessage,
    ] : []),
  };

  return Object.assign({}, defaultConfig, otherConfig);
};

const buildSize = ({
  dist,
  images,
  scripts,
  styles,
}, {
  buildSize: config = {},
}) => () => {
  const defaultConfig = {
    allSrc: path.posix.join(dist, '/**/*'),
    allCfg: {
      title: 'build',
      gzip: true,
    },
    cssSrc: path.posix.join(dist, styles, '/**/*'),
    cssCfg: {
      title: 'CSS',
      gzip: true,
    },
    imgSrc: path.posix.join(dist, images, '/**/*'),
    imgCfg: {
      title: 'Images',
      gzip: false,
    },
    jsSrc: path.posix.join(dist, scripts, '/**/*'),
    jsCfg: {
      title: 'JS',
      gzip: true,
    },
  };

  return Object.assign({}, defaultConfig, config);
};

// Be carefull what you cleaning!
const clean = ({ tmp, dist }, { clean: config }) => () => config || [tmp, dist];

const copy = ({
  app,
  dist,
  fonts,
  icons,
}, { copy: config = {} }) => () => {
  const defaultConfig = {
    cfg: {
      base: app,
      dot: true,
    },
    src: [
      path.posix.join(app, fonts, '**/*'),
      path.posix.join(app, icons, '**/*'),
      path.posix.join(app, '*.*'),
    ],
    dest: dist,
  };

  return Object.assign({}, defaultConfig, config);
};

const deploy = ({ dist }, { deploy: config = {} }) => () => {
  const defaultConfig = {
    src: path.posix.join(dist, '/**'),
    cfg: {
      root: dist,
      hostname: process.env.FTP_HOSTNAME,
      username: process.env.FTP_USER,
      destination: process.env.FTP_DEST,
    },
  };

  return Object.assign({}, defaultConfig, config);
};

const icons = ({
  app,
  icons: iconsPath,
  iconsApp,
  iconsStyleguide,
  dist,
  tmp,
}, { icons: config = {} }) => () => {
  const defaultConfig = {
    srcApp: path.posix.join(app, iconsPath, iconsApp, '*.svg'),
    srcStyleguide: path.posix.join(app, iconsPath, iconsStyleguide, '*.svg'),
    dest: getFlag('isBuild')
      ? path.posix.join(dist, iconsPath)
      : path.posix.join(tmp, iconsPath),
    iconPrefix: 'icon-',
    cheerioCfg: {
      run: ($) => {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true,
      },
    },
    imageminCfg: {
      svgoPlugins: [{
        cleanupIDs: true,
        cleanupAttrs: true,
        removeComments: true,
        removeMetadata: true,
        removeUselessDefs: true,
        removeEditorsNSData: true,
        convertStyleToAttrs: true,
        convertPathData: true,
        convertTransform: true,
        collapseGroups: true,
        mergePaths: true,
        convertShapeToPath: true,
        removeStyleElement: true,
      }],
    },
  };

  return Object.assign({}, defaultConfig, config);
};

const images = ({ app, images: imagesPath, dist }, { images: config = {} }) => () => {
  const defaultConfig = {
    src: path.posix.join(app, imagesPath, '**/*.{gif,png,jpg,svg}'),
    dest: path.posix.join(dist, imagesPath),
    optimizeImages: true,
    cfg: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        cleanupIDs: true,
        cleanupAttrs: true,
        removeComments: true,
        removeMetadata: true,
        removeUselessDefs: true,
        removeEditorsNSData: true,
        convertStyleToAttrs: true,
        convertPathData: true,
        convertTransform: true,
        collapseGroups: true,
        mergePaths: true,
        convertShapeToPath: true,
      }],
    },
  };

  return Object.assign({}, defaultConfig, config);
};

const modernizr = ({
  app,
  dist,
  scripts,
  styles,
  tmp,
}, { modernizr: config }) => () => {
  const defaultConfig = {
    src: [
      path.posix.join(app, scripts, '**/*.js'),
      path.posix.join(tmp, styles, '*.css'),
    ],
    dest: getFlag('isBuild')
      ? path.posix.join(dist, scripts, 'plugins')
      : path.posix.join(tmp, scripts, 'plugins'),
    cfg: {
      silent: true,
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind',
      ],
    },
  };

  return Object.assign({}, defaultConfig, config);
};

const getEntriesFromGlob = (globPath) => {
  const files = glob.sync(globPath);
  const entries = {};

  for (let i = 0; i < files.length; i += 1) {
    const entry = files[i];
    entries[path.basename(entry, path.extname(entry))] = entry;
  }

  return entries;
};

const scripts = ({
  app,
  dist,
  scripts: scriptsPath,
  tmp,
}, { scripts: config = {} }) => () => {
  const {
    webpackModuleRules = [],
    webpackPlugins = [],
  } = config;

  const otherConfig = _.omit(config, ['webpackModuleRules', 'webpackPlugins']);

  const defaultConfig = {
    context: cwd,
    entry: getEntriesFromGlob(path.posix.join(app, scriptsPath, '/*.js')),
    output: {
      filename: '[name].js',
      path: getFlag('isBuild')
        ? path.posix.join(dist, scriptsPath)
        : path.posix.join(tmp, scriptsPath),
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules|bower_components|scripts\/plugins/,
        use: {
          loader: 'eslint-loader',
          options: {
            cwd,
          },
        },
      }, {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              [
                'env',
                {
                  modules: false,
                  loose: true,
                  targets: {
                    browsers: pkg.browserslist,
                  },
                },
              ],
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
            ],
          },
        },
      }].concat(webpackModuleRules),
    },
    plugins: ([
      new webpack.DefinePlugin({
        process: {},
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),
    ]).concat(process.env.NODE_ENV === 'production' ? [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false,
          pure_funcs: [
            'classCallCheck',
            '_possibleConstructorReturn',
            '_classCallCheck',
            'Object.freeze',
            'invariant',
            'warning',
          ],
        },
        output: { comments: false },
      }),
    ] : []).concat(webpackPlugins),
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    performance: false,
    watch: getFlag('isWatch'),
  };

  return Object.assign({}, defaultConfig, otherConfig);
};

const styles = ({
  app,
  dist,
  styles: stylesPath,
  tmp,
}, { styles: config = {} }) => () => {
  const defaultConfig = {
    src: path.posix.join(app, stylesPath, '*.scss'),
    dest: getFlag('isBuild')
      ? path.posix.join(dist, stylesPath)
      : path.posix.join(tmp, stylesPath),
    sassCfg: {},
    autoprefixerCfg: {},
    inlineSvgCfg: { removeFill: true },
  };

  return Object.assign({}, defaultConfig, config);
};

const templates = ({
  app,
  dist,
  icons: iconsPath,
  tmp,
  views,
}, { templates: config = {} }) => () => {
  pug.filters.code = block => (
    block
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/#/g, '&#35;')
      .replace(/\\/g, '\\\\')
  );

  const defaultConfig = {
    base: path.posix.join(app, views),
    src: path.posix.join(app, views, '**/*.pug'),
    dest: getFlag('isBuild') ? path.posix.join(dist) : tmp,
    pugInheritanceCfg: {
      basedir: path.posix.join(app, views),
      skip: 'node_modules',
    },
    pugCfg: {
      pug,
      pretty: true,
      compileDebug: true,
    },
    iconsPaths: {
      app: getFlag('isBuild')
        ? path.posix.join(dist, iconsPath, 'app.svg')
        : path.posix.join(tmp, iconsPath, 'app.svg'),
      styleguide: getFlag('isBuild')
        ? path.posix.join(dist, iconsPath, 'styleguide.svg')
        : path.posix.join(tmp, iconsPath, 'styleguide.svg'),
    },
    filterPaths: [
      /^[^\\/]+\.pug$/,
      /^styleguide[\\/][^\\/]+\.pug$/,
    ],
  };

  return Object.assign({}, defaultConfig, config);
};

const templatesData = ({
  app,
  data,
  styleguide,
  tmp,
  views,
}, { templatesData: config = {} }) => () => {
  const defaultConfig = {
    src: [
      path.posix.join(app, views, data, '/**/*.yaml'),
      path.posix.join(app, views, styleguide, data, '/**/*.yaml'),
    ],
    dest: path.posix.join(tmp, '/data'),
    dataName: 'data.yaml',
    dataPath: path.posix.join(tmp, 'data/data.yaml'),
    helpersPath: path.posix.join(app, views, styleguide, 'helpers', 'helpers.js'),
    additionalData: { flags },
  };

  return Object.assign({}, defaultConfig, config);
};

const watch = ({
  app,
  data,
  icons: iconsPath,
  scripts: scriptsPath,
  styleguide,
  styles: stylesPath,
  views,
}, { watch: config = {} }) => () => {
  const defaultConfig = {
    styles: path.posix.join(app, stylesPath, '/**/*.scss'),
    pug: [
      path.posix.join(app, views, '/**/*.pug'),
      path.posix.join(app, views, data, '/**/*.yaml'),
      path.posix.join(app, views, styleguide, data, '/**/*.yaml'),
      path.posix.join(app, views, styleguide, 'helpers', '/**/*.js'),
    ],
    icons: [
      path.posix.join(app, iconsPath, '/**/*.svg'),
    ],
  };

  return Object.assign({}, defaultConfig, config);
};

const defaultConfig = (paths, config) => ({
  browserSync: browserSync(paths, config),
  buildSize: buildSize(paths, config),
  clean: clean(paths, config),
  copy: copy(paths, config),
  deploy: deploy(paths, config),
  images: images(paths, config),
  modernizr: modernizr(paths, config),
  scripts: scripts(paths, config),
  styles: styles(paths, config),
  icons: icons(paths, config),
  templates: templates(paths, config),
  templatesData: templatesData(paths, config),
  watch: watch(paths, config),
});

class Config {
  constructor() {
    const configPath = path.join(cwd(), 'light.config.js');

    const defaultPaths = {
      app: path.posix.join(process.cwd(), 'app'),
      tmp: path.posix.join(process.cwd(), '.tmp'),
      dist: path.posix.join(process.cwd(), 'dist'),
      data: 'data',
      styleguideData: '',
      fonts: 'fonts',
      icons: 'icons',
      images: 'images',
      scripts: 'scripts',
      styleguide: 'styleguide',
      styles: 'styles',
      iconsApp: 'app',
      iconsStyleguide: 'styleguide',
      views: 'views',
    };

    let config = {};
    let paths = {};
    let myConfig = null;

    if (fs.existsSync(configPath)) {
      myConfig = require(configPath); // eslint-disable-line
    }

    if (typeof (myConfig) === 'function') {
      ({ config = {}, paths = {} } =
        myConfig(defaultPaths, defaultConfig(defaultPaths, {}), flags));
    }

    return defaultConfig(Object.assign({}, defaultPaths, paths), config);
  }
}

module.exports = new Config();
