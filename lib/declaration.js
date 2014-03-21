function declaration(options, inline) {
	options = options || {};
	var version = options.version || '1.0';
	var output = '<?xml version="' + version + '"';
	if (typeof options.encoding !== 'undefined') {
		output += ' encoding="' + options.encoding + '"';
	}
	if (typeof options.standalone !== 'undefined') {
		output += ' standalone="' + options.standalone + '"';
	}
	output += '?>';
	if (!inline) {
		return output + '\n';
	} else {
		return output;
	}
}

module.exports = declaration;
