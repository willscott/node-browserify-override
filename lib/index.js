var getMiddleware = function(handlers, rules) {

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

module.exports = getMiddleware(handlers, {});
module.exports.rules = function(rules) {
  return getMiddleware(handlers, require(rules));
};
