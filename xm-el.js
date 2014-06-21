!function() {

var xml = {};

xml.declaration = function(options, inline) {
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

	// add newline unless specified inline
	if (!inline) {
		return output + '\n';
	} else {
		return output;
	}
};
var doctypes = {
  'html5':               '<!DOCTYPE html>',
  'html4-strict':        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
  'html4-transitional':  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
  'html4-frameset':      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">',

  'xhtml1-strict':       '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
  'xhtml1-transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
  'xhtml1-frameset':     '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
  'xhtml1.1':            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
  'xhtml1.1-basic':      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',

  'mathml1':             '<!DOCTYPE math SYSTEM "http://www.w3.org/Math/DTD/mathml1/mathml.dtd">',
  'mathml2':             '<!DOCTYPE math PUBLIC "-//W3C//DTD MathML 2.0//EN" "http://www.w3.org/Math/DTD/mathml2/mathml2.dtd">',

  'svg1.0':              '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">',
  'svg1.1':              '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
  'svg1.1-basic':        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Basic//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd">',
  'svg1.1-tiny':         '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">',

  'musicxml-partwise':   '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">',
  'musicxml-timewise':   '<!DOCTYPE score-timewise PUBLIC "-//Recordare//DTD MusicXML 3.0 Timewise//EN" "http://www.musicxml.org/dtds/timewise.dtd">',

  'plist':               '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
};
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

function Element(tagName, selfClosing) {
	this.tagName = tagName;
	this.selfClosing = selfClosing || false;
	this.attributes = {};
	this.children = [];
	this._value = '';
	return this;
}

Element.prototype.text = function(value) {
	if (typeof value === 'undefined') {
		return this._value;
	} else {
		this._value = value.toString();
		return this;
	}
};

Element.prototype.append = function(item, selfClosing) {
	var elem;
	selfClosing = selfClosing || false;
	if (typeof item === 'string') {
		elem = new Element(item, selfClosing);
	} else {
		elem = item;
	}
	this.children.push(elem);
	return elem;
};

Element.prototype.attr = function(name, value) {
	if (arguments.length === 0) {
		throw new Error('cannot call "Element.attr()" without arguments');
	} else if (arguments.length === 1) {
		if (typeof name === 'string') {
			// if given a string, return the value for that attribute
			return this.attributes[name];
		} else if (typeof name === 'object') {
			// if given an object, loop through to assign all attrs
			for (var key in name) {
				this.attributes[key] = name[key];
			}
			return this;
		} else {
			// throw an error on any other type of input
			throw new TypeError('Element.attr() must be called with a String or Object as the first argument.');
		}
	} else {
		this.attributes[name] = value;
		return this;
	}
};

Element.prototype.stringify = function(indent) {
	if (typeof indent !== 'undefined') {
		return tidy(this, indent);
	}
	var output = '<' + this.tagName;
	for (var a in this.attributes) {
		output += ' ' + a + '="' + this.attributes[a] + '"';
	}
	if (this.selfClosing) {
		output += ' />';
		return output;
	}
	output += '>';
	output += this._value;
	if (this.children.length === 0) {
		output += '</' + this.tagName + '>';
		return output;
	}
	for (var c = 0; c < this.children.length; c++) {
		output += this.children[c].stringify();
	}
	output += '</' + this.tagName + '>';
	return output;
};

xml.element = function(tag, sc) {
	return new Element(tag, sc);
};
function space(indent, level) {
  var output = '';
  var tab = '';
  for (var t = 0; t < indent; t++) {
    tab += ' ';
  }
  for (var l = 0; l < level; l++) {
    output += tab;
  }
  return output;
}


function tidy(element, indent, current_level) {
  current_level = current_level || 0;
  // has children?
  if (element.children.length === 0) {
    // no- print inline at current indent level
    return space(indent, current_level) + element.stringify();
  } else {
    // yes- print start-tag at current indent level
    var attrs = '';
    for (var a in element.attributes) {
      attrs += ' ' + a + '="' + element.attributes[a] + '"';
    }
    var start = space(indent, current_level) + '<' + element.tagName + attrs + '>' + '\n';
      // print children at current+1 indent level
      var middle = '';
      for (var c = 0; c < element.children.length; c++) {
        middle += tidy(element.children[c], indent, current_level + 1) + '\n';
      }
    // print end-tag at current indent level
    var end = space(indent, current_level) + '</' + element.tagName + '>';
    return start + middle + end;
  }
}

if (typeof define === "function" && define.amd) {
  define(xml);
} else if (typeof module === "object" && module.exports) {
  module.exports = xml;
} else {
  this.xml = xml;
}

}();
