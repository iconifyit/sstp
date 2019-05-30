// var Node = require('./Node.js');

var Converter = function(items, context) {
    var len,
        path,
        node,
        cls;

    this.path   = null;
    this.points = [];

    len = items.length;

    for (var i = 0; i < len; i++) {
        node = items.item(i);

        this.addPath();
        this.setClassAttr(
            node.getAttribute('class')
        );

    }
}

Converter.prototype.setPoints = function(points) {
    this.points = points.map(function(item) {
        return item.toFixed(3) + ' ';
    });
};

Converter.prototype.addPath = function() {
    this.path = context.createElementNS(svgn, 'path');
};

Converter.prototype.setPathData = function(path, points) {
    this.path.setAttribute('d', 'M' + this.points.join(' '));
};

Converter.prototype.setClassAttr = function(cls) {
    this.path.setAttribute('class', cls);
};

Converter.prototype.setAttr = function(attr, cls) {
    this.path.setAttribute(attr, cls);
};

exports.Converter = Converter;
