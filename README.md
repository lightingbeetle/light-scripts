# Light scripts

> Build scripts for Lighting Beetle* light framework.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install light-scripts --save-dev
```
or
```
yarn add light-scripts --dev
```

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
Tasks should be run in main project folder, which dependents on `light-scripts`.

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

Tasks should be run in main project folder, which dependents on `light-scripts`.
## License

MIT