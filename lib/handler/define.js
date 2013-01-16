module.exports = function(key, rule, bundle) {
  var base = rule['from'].filename.match(/(.*\/)[^\/]*/)[1];
	bundle.addEntry(rule['with'] || key, {
		target: key,
		dirname: base
	});
};