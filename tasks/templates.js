const pug = require('gulp-pug');
const data = require('gulp-data');
const changed = require('gulp-changed');
const cached = require('gulp-cached');
const pugInheritance = require('gulp-pug-inheritance');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const fs = require('fs');
const gulpif = require('gulp-if');

const yamlMerge = require('gulp-yaml-merge');
const yaml = require('js-yaml');
const md5File = require('md5-file');

const { templates, templatesData } = require('./../config.js');
const browserSync = require('./browserSync').browserSync;
const handleError = require('./../utils/handleError.js');
const { getFlag } = require('./../utils/flags');

let dataFileHashCache = null;
let iconsHashCache = null;
let isFirstRun = null;
let isYamlError = false;

// Compile pug to html

const templatesTask = gulp => (done) => {
  const {
    src,
    base,
    filterPaths,
    iconsPaths,
    pugCfg,
    pugInheritanceCfg,
    dest,
  } = templates();

  const { dataPath, helpersPath, requires, additionalData } = templatesData();

  // get data file hash with cached data file to determine if file changes
  const dataFileHash = md5File.sync(dataPath);
  // get icon files hashes to determine if icons changed
  const iconsHash = Object
    .keys(iconsPaths)
    .map(key => iconsPaths[key])
    .reduce((acc, file) => {
      if (fs.existsSync(file)) {
        acc.push(file);
      }
      return acc;
    }, [])
    .reduce((acc, file) => (acc + md5File.sync(file)), '');

  const isExternalChange = (
    (
      (dataFileHashCache !== null)
      && (dataFileHashCache !== dataFileHash)
    )
    || (
      (iconsHashCache !== null)
      && (iconsHashCache !== iconsHash)
    )
  );

  dataFileHashCache = dataFileHash;
  iconsHashCache = iconsHash;

  // check if this is first run of this task
  isFirstRun = (isFirstRun === null);

  gulp.src(src, { base })
    .pipe(plumber(handleError))
    .pipe(gulpif(getFlag('isWatch') && !isExternalChange, changed('.tmp', { extension: '.html' })))
    .pipe(gulpif(getFlag('isWatch') && !isExternalChange, cached('pug')))
    // Do not run pug-inheritance in the first run. It's not needed, because we compile
    // everything anyway and it takes too much time.
    .pipe(
      gulpif(
        getFlag('isWatch') && !isExternalChange && !isFirstRun,
        pugInheritance(pugInheritanceCfg)
      )
    )
    .pipe(filter(
      file => (
        filterPaths
          .map(path => path.test(file.relative))
          .reduce((acc, val) => acc || val)
      )
    ))
    .pipe(data(() => {
      const yamlData = yaml.safeLoad(
        fs.readFileSync(dataPath, 'utf8')
      );
      const helpers = fs.existsSync(helpersPath) ? require(helpersPath) : {}; // eslint-disable-line
      return Object.assign({}, yamlData, helpers, requires, { iconsPaths }, additionalData);
    }))
    .pipe(pug(pugCfg))
    .pipe(gulp.dest(dest))
    .on('finish', () => {
      if (!isYamlError && getFlag('isWatch')) {
        browserSync.reload({ once: true });
      }
      done();
    });
};

// Concat *.json file to single data.json

const templatesPrepareDataTask = gulp => () => {
  const { src, dataName, dest } = templatesData();

  isYamlError = false;
  return gulp.src(src)
    .pipe(plumber(function stylesErrorHandler(error) {
      isYamlError = true;
      handleError.call(this, error);
    }))
    .pipe(yamlMerge(dataName))
    .pipe(gulp.dest(dest));
};

module.exports = {
  templatesTask,
  templatesPrepareDataTask,
};
