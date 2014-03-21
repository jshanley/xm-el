var xml = require('../');

exports.declaration = function(test) {
  test.expect(3);
  test.equal(xml.declaration({}, true), '<?xml version="1.0"?>');
  test.equal(xml.declaration(), '<?xml version="1.0"?>\n');
  test.equal(xml.declaration({
    encoding: 'utf-8',
    standalone: 'no',
    version: '1.0'
  }), '<?xml version="1.0" encoding="utf-8" standalone="no"?>\n');
  test.done();
};
