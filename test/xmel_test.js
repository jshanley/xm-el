var xml = require('../');

exports['xm-el'] = function(test) {
  test.expect(3);
  test.ok(xml.element);
  test.ok(xml.declaration);
  test.ok(xml.doctype);
  test.done();
};
