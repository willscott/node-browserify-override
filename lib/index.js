var getMiddleware = function(handlers, rules) {
	// By default (like when browserify is run on the commandline and arguments
	// can't be provided to plugins), look for "rules.js" on the search path to
	// specify local overrides.
  if (rules == null) {
    try {
      rules = require("rules.js");
    } catch(e) {
      console.warn("No Override rules found.");
      rules = {};
    }
  }

  return function(bundle) {
    bundle.register(function(body, file) {
			for (key in rules) {
				if (rules.hasOwnProperty(key) &&
				    file.indexOf(key, file.length - key.length) !== -1) {
					var handler = handlers[rules[file].action];
					body = handler(body, file, rules[file], bundle);
					break;
				}
			}
			return body;
    });
  };
};

//default handlers
var handlers = {
  'replace' : require('./handler/replace'),
  'patch'  : require('./handler/patch')
};

module.exports = getMiddleware(handlers, null);
module.exports.rules = function(rules) {
  return getMiddleware(handlers, require(rules));
};
