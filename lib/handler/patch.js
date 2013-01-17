module.exports = function(body, file, rule, bundle) {
	var lines = body.split('\n');
	var rules = rule['rules'];
	for (var pair in rules) {
		var old = pair['from'];
		var regexp = new RegExp(old)
		for (var i = 0; i < lines.length; i++) {
			lines[i] = lines[i].replace(regexp, pair['to']);
		}		
	}
	return lines.join('\n');
};