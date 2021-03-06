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
