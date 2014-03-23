if (typeof define === "function" && define.amd) {
  define(xml);
} else if (typeof module === "object" && module.exports) {
  module.exports = xml;
} else {
  this.xml = xml;
}

}();
