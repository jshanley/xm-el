var xml = require('../');

// some familiar names
var members = {
  'John Lennon': 'guitar',
  'Paul McCartney': 'bass',
  'George Harrison': 'guitar',
  'Ringo Starr': 'drums'
};

// lets say they're in a band
var beatles = xml.element('band')
  .attr('name', 'The Beatles');

for (var name in members) {
  // add each member using append()
  beatles.append('member')
    .attr('instrument', members[name])
    .text(name);
}

// gotta have a manager
beatles.append('manager')
  .text('Brian Epstein');

// lets create a standalone file out of the beatles example
var declaration = xml.declaration({standalone: 'yes'});

// giving an argument to stringify() tidies output with the specified indent
var output = declaration + beatles.stringify(2);

// write to file
var fs = require('fs'),
    path = require('path');
var filename = path.resolve(process.cwd(), './beatles.xml');
fs.writeFileSync(filename, output);
