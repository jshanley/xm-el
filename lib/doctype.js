var doctypes = require('./doctypes.json');

function doctype(dt, inline) {
	// set up some shortcuts
	if (dt === 'html') {
		output = doctypes['html5'];
	}
	if (dt === 'xhtml') {
		output = doctypes['xhtml1.1'];
	}
	if (dt === 'mathml') {
		output = doctypes['mathml2'];
	}
	if (dt === 'svg') {
		output = doctypes['svg1.1'];
	}
	if (dt === 'musicxml') {
		output = doctypes['musicxml-partwise'];
	}
	// look up the doctype
	if (doctypes[dt]) {
		output = doctypes[dt];
	} else {
		throw new Error('doctype "' + dt + '" not found.');
	}
	if (!inline) {
		return output + '\n';
	} else {
		return output;
	}
}

module.exports = doctype;
