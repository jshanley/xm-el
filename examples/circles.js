var xml = require('../');

// create svg1.1 doctype
var doctype = xml.doctype('svg');
var declaration = xml.declaration();

// now lets write a simple svg file
var svg = xml.element('svg')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 300)
  .attr('height', 200)
  .attr('viewBox', '0 0 300 200');

var g = svg.append('g')
  .attr('class', 'circle-group');

// create 10 random circles
var circles = 10;
while (circles > 0) {
  g.append('circle')
    .attr('cx', Math.floor(Math.random() * 300))
    .attr('cy', Math.floor(Math.random() * 200))
    .attr('r', 4 + Math.floor(Math.random() * 10))
    .attr('stroke-width', 1 + Math.floor(Math.random() * 3))
    .attr('stroke', '#333');
  circles--;
}

// put it all together
var output = declaration + doctype + svg.stringify(2);

// output a file
var filename = require('path').resolve(process.cwd(), './circles.svg');
require('fs').writeFileSync(filename, output);
