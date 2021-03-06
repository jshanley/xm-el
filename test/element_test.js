var xml = require('../');

exports.element = function(test) {
  test.expect(8);
  test.equal(xml.element('test').stringify(), '<test></test>');
  test.equal(xml.element('br', true).stringify(), '<br />');
  var p = xml.element('parent').attr('name', 'Bob');
  var c = p.append('child').text('child text');
  test.equal(p.children.length, 1);
  test.equal(c._value, 'child text');
  test.equal(c.text(), c._value);
  test.equal(p.attributes.name, 'Bob');
  var el = xml.element('elem').attr({
    'foo': 6,
    bar: 'baz'
  });
  test.equal(el.attributes.foo, 6);
  test.equal(el.attributes.bar, 'baz');
  test.done();
};
