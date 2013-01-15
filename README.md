[Browserify](https://github.com/substack/node-browserify) middleware for local customization of a compilation.

# Installation

```bash
$ npm install browserify-override
```

# Usage

browserify-override is a browserify middleware :

```js
var b = require('browserify')();
b.use(require('browserify-override').flags())
```

## Licence
MIT