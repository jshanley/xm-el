var xml = require('../');

exports.doctype = function(test) {
  test.expect(4);
  test.equal(xml.doctype('html5', true), '<!DOCTYPE html>');
  test.equal(xml.doctype('html5'), '<!DOCTYPE html>\n');
  test.equal(xml.doctype('svg1.0'), '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n');
  test.throws(function(){
    return xml.doctype('nonsense');
  });
  test.done();
};
