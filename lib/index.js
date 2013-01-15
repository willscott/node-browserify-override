var getMiddleware = function(handlers, rules) {
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
			if (rules[file]) {
				var handler = handlers[rules[file].action];
				body = handler(body, file, rules[file], bundle);
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
