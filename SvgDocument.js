/**
 * SvgDocument base class.
 * @param document
 * @constructor
 */
var SvgDocument = function(document) {
    this.NS  = "http://www.w3.org/2000/svg";
    this.doc = document;
    this.svg = this.doc.getElementsByTagName("svg")[0];
}

/**
 * Query the SVG for elements by name.
 * @param nodeName
 * @returns {HTMLCollectionOf<Element> | Array}
 */
SvgDocument.prototype.getElements = function(nodeName) {
    return this.svg.getElementsByTagName(nodeName) || [];
};

/**
 * Get the data property.
 * @returns {*}
 */
SvgDocument.prototype.getData = function() {
    return this.data;
}

/**
 * Export module.
 * @type {SvgDocument}
 */
exports.SvgDocument = SvgDocument;
