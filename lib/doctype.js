var doctypes = require('./doctypes.json');

function doctype(dt) {
	if (dt === 'html') {
		return doctypes['html5'];
	}
	if (dt === 'xhtml') {
		return doctypes['xhtml1.1'];
	}
	if (dt === 'mathml') {
		return doctypes['mathml2'];
	}
	if (dt === 'svg') {
		return doctypes['svg1.1'];
	}
	if (doctypes[dt]) {
		return doctypes[dt];
	} else {
		throw new Error('doctype "' + dt + '" not found.');
	}
}

module.exports = doctype;