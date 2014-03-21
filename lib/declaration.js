function declaration(options) {
	options = options || {};
	var version = options.version || '1.0';
	var output = '<?xml version="' + version + '"';
	if (typeof options.encoding !== 'undefined') {
		output += ' encoding="' + options.encoding + '"';
	}
	if (typeof options.standalone !== 'undefined') {
		output += ' standalone="' + options.standalone + '"';
	}
	output += '?>'
	return output;
}

module.exports = declaration;