module.exports = function(body, file, rule, bundle) {
	var pattern = rule['replace'];
	var regexp = new RegExp(pattern);
	var lines = body.split('\n');
	for (var i = 0; i < lines.length; i++) {
		lines[i].replace(regexp, rule['with']);
	}
	return lines.join('\n');
};