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
