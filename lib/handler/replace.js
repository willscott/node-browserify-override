module.exports = function(body, file, rule, bundle) {
	var rep = rule['with'];
	if (rule['from'] && rule['from'].filename) {
	  var base = rule['from'].filename.match(/(.*\/)[^\/]*/)[1];
		rep = base + rep;
	}
  return bundle.readFile(rep);
};