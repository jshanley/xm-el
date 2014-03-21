var doctypes = require('./doctypes.json');

function doctype(dt, inline) {
	// set up some shortcuts
	if (dt === 'html') {
		output = doctypes['html5'];
	}
	else if (dt === 'xhtml') {
		output = doctypes['xhtml1.1'];
	}
	else if (dt === 'mathml') {
		output = doctypes['mathml2'];
	}
	else if (dt === 'svg') {
		output = doctypes['svg1.1'];
	}
	else if (dt === 'musicxml') {
		output = doctypes['musicxml-partwise'];
	}
	// look up the doctype
	else if (doctypes[dt]) {
		output = doctypes[dt];
	} else {
		throw new Error('doctype "' + dt + '" not found.');
	}
	
	// add a newline unless specified inline
	if (!inline) {
		return output + '\n';
	} else {
		return output;
	}
}

module.exports = doctype;
