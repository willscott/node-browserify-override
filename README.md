[Browserify](https://github.com/substack/node-browserify) middleware for local customization of a compilation.

# Installation

```bash
$ npm install browserify-override
```

# Usage

browserify-override is a browserify middleware :

```js
var b = require('browserify')();
b.use(require('browserify-override').rules({
  'sasl.js': {
    action: 'patch',
    rules: [{
      from: 'console.log',
      to: '//console.log'
    }]
  },
  'net.js': {
    action: 'replace',
    with: 'net.js',
    from: module
  },
  'dns': {
    action: 'define',
    with: 'dns.js',
    from: module
  }
}));
```

If rules are not explicitly provided, browserify-override will `require("rules.js")`,
allowing you to set rules in a rules.js file in a valid [node_modules folder](http://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders).

# Example

The canonical example of browserify-override, is the modifications in [UProxy](https://github.com/UWNetworksLab/UProxy/tree/master/node-xmpp/chrome-support),
which patch the node-xmpp code-base to run as a chrome application based on the chrome.socket API.

## Licence
MIT
