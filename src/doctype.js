xml.doctype = function(dt, inline) {
	// set up some shortcuts
	switch (dt) {
	case 'html':
		output = doctypes['html5'];
		break;
	case 'xhtml':
		output = doctypes['xhtml1.1'];
		break;
	case 'mathml':
		output = doctypes['mathml2'];
		break;
	case 'svg':
		output = doctypes['svg1.1'];
		break;
	case 'musicxml':
		output = doctypes['musicxml-partwise'];
		break;
	default:
		// look up the doctype
		if (doctypes[dt]) {
			output = doctypes[dt];
		} else {
			throw new Error('doctype "' + dt + '" not found.');
		}
	}

	// add a newline unless specified inline
	if (!inline) {
		return output + '\n';
	} else {
		return output;
	}
};
