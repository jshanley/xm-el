# xm-el

Simple XML creation using d3.js-inspired syntax.

## Install
```shell
npm install xm-el
```

## Examples
examples will reference the library as variable 'xml':
```javascript
var xml = require('xm-el');
```
### Create Elements:
Create basic elements with `xml.element(<tagname>)`
```javascript
var kerouac = xml.element('author');
```
Add a text node with `.text()`
```javascript
kerouac.text('Jack Kerouac');
```
Add attributes with `.attr(<name>, <value>)`
```javascript
kerouac.attr('literary-movement', 'Beat');
```

Get the markup as a string using `.stringify()`
```javascript
kerouac.stringify();
// '<author literary-movement="Beat">Jack Kerouac</author>'
```
Create self-closing elements with `xml.element(<tagname>, true)`
```javascript
// create a self-closing element, set 2nd argument to 'true'
var pagebreak = xml.element('br', true);
pagebreak.stringify();
// '<br />'
```

Multiple attributes can be assigned in a single call by passing a plain object to `Element.attr()`
```javascript
var svg = xml.element('svg')
  .attr({
    'width': 400,
    'height': 300,
    'viewBox': '0 0 400 300',
    'preserveAspectRatio': 'xMidYMid meet'
  });
```
### Chaining:
Creating an element or setting an attribute returns the element, which allows you to chain methods together:

```javascript
xml.element('composer')
  .attr('last-name', 'Reich')
  .attr('genre', 'minimalism')
  .text('Steve Reich')
  .stringify();
// '<composer last-name="Reich" genre="minimalism">Steve Reich</composer>'
```

### Child Elements:
Create child elements using `.append(<tagname>)`
```javascript
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
```

### Output to file:

Create an xml declaration with `xml.declaration(<options>)`.

If no options are given, the default output is `<?xml version="1.0"?>`

the options argument is a plain object with 3 optional properties: `version`, `encoding` and `standalone`.


```javascript
// lets create a standalone file out of the beatles example
var declaration = xml.declaration({standalone: 'yes'});

// giving an argument to stringify() tidies output with the specified indent
var output = declaration + beatles.stringify(2);
// write to file
require('fs').writeFileSync('/path/to/beatles.xml', output)
```
beatles.xml
```xml
<?xml version="1.0" standalone="yes"?>
<band name="The Beatles">
  <member instrument="guitar">John Lennon</member>
  <member instrument="bass">Paul McCartney></member>
  <member instrument="guitar">George Harrison</member>
  <member instrument="drums">Ringo Starr</member>
  <manager>Brian Epstein</manager>
</band>
```
Create a doctype with `xml.doctype(<name>)`
```javascript
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

// output a file
var output = declaration + doctype + svg.stringify(2);
require('fs').writeFileSync('/path/to/circles.svg', output);
```
circles.svg
```xml
<?xml version="1.0"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <g class="circle-group">
    <circle cx="87" cy="194" r="9" stroke-width="3" stroke="#333"></circle>
    <circle cx="279" cy="97" r="7" stroke-width="2" stroke="#333"></circle>
    <circle cx="264" cy="24" r="5" stroke-width="2" stroke="#333"></circle>
    <circle cx="16" cy="43" r="11" stroke-width="3" stroke="#333"></circle>
    <circle cx="52" cy="32" r="7" stroke-width="3" stroke="#333"></circle>
    <circle cx="298" cy="83" r="4" stroke-width="1" stroke="#333"></circle>
    <circle cx="91" cy="107" r="10" stroke-width="3" stroke="#333"></circle>
    <circle cx="281" cy="169" r="10" stroke-width="2" stroke="#333"></circle>
    <circle cx="107" cy="51" r="13" stroke-width="2" stroke="#333"></circle>
    <circle cx="225" cy="154" r="8" stroke-width="1" stroke="#333"></circle>
  </g>
</svg>
```
