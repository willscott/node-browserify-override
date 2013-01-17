var fs = require('fs');

module.exports = function(key, rule, bundle) {
  var rep = rule['with'] || key;
  var base = rule['from'].filename.match(/(.*\/)[^\/]*/)[1];
	rep = base + rep;
	var body = fs.readFileSync(rep, 'utf8').replace(/^#![^\n]*\n/, '');
	bundle.include(rep, key, body, null);
};