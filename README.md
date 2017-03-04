# Light scripts

> Build scripts for Lighting Beetle* light framework.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

## Prerequisites

```
node.js >= 6.9.0
```

## Install

```
npm install light-scripts --save-dev
```
or
```
yarn add light-scripts --dev
```

## Features

* Webserver with liverelaod ([Browsersync](https://www.browsersync.io/))
* Pug templates compilation with incremental builds ([Pug](https://pugjs.org/)) ([pug-inheritance](https://github.com/adammockor/pug-inheritance))
* Scss compilation ([node-sass](https://github.com/sass/node-sass))
* CSS autoprefixing ([autoprefixer](https://autoprefixer.github.io/))
* JS bundling ([webpack 2](https://webpack.js.org/))
* JS compilation ([babel](https://babeljs.io/)) ([babel-preset-env](https://github.com/babel/babel-preset-env))
* JS linting ([eslint](http://eslint.org/)) ([airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base))
* Image optimization ([imagemin](https://github.com/imagemin/imagemin))
* Lean Modernizr builds ([gulp-modernizr](https://github.com/doctyper/gulp-modernizr))
* Deploying via rsync/sftp ([gulp-rsync](https://github.com/jerrysu/gulp-rsync))

## Usage

### Config
Add `light.config.js` file to `light` project root. Format of config file should look like this:
```js
module.exports = (defaultPaths, defaultConfig, flags) => ({
  paths: {},
  config: {},
});
```
Via config file, default configuration can be customized if necessary.

If custom configuration is not needed, `light.config.js` can be omitted.

### Tasks
Tasks should be run in main project folder, which depends on `light-scripts`.

Main gulp tasks:

* Project serving with live-reload:
```
gulp serve
```

* Project build:
```
gulp serve
```

* Other tasks:
```
gulp -T
```

## License

MIT
