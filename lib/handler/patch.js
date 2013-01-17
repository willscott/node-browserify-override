module.exports = function(body, file, rule, bundle) {
	var lines = body.split('\n');
	var rules = rule['rules'];
	for (var i = 0; i < rules.length; i++) {
		var pair = rules[i];
		var old = pair['from'];
		var regexp = new RegExp(old)
		for (var j = 0; j < lines.length; j++) {
			lines[j] = lines[j].replace(regexp, pair['to']);
		}		
	}
	return lines.join('\n');
};