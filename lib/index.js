var getMiddleware = function(handlers, initial, rules) {
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
	
	for (key in rules) {
		if (rules.hasOwnProperty(key) &&
		    initial.hasOwnProperty(rules[key].action)) {
			initial[rules[key].action](key, rules[key], bundle);
		}
	}

  return function(bundle) {
    bundle.register(function(body, file) {
			for (key in rules) {
				if (rules.hasOwnProperty(key) &&
				    file.indexOf(key, file.length - key.length) !== -1) {
					var handler = handlers[rules[key].action];
					body = handler(body, file, rules[key], bundle);
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

var inital = {
	'define': require('./handler/define')
};

module.exports = getMiddleware(handlers, initial, null);
module.exports.rules = function(rules) {
  return getMiddleware(handlers, initial, require(rules));
};
