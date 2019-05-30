// var Node = require('./Node.js');

/**
 * Base converter class.
 * @param document
 * @constructor
 */
var Converter = function(document) {

    this.NS  = "http://www.w3.org/2000/svg";
    this.doc = document;
    this.svg = this.doc.getElementsByTagName("svg")[0];
};

/**
 * Get the document element.
 * @returns {*}
 */
Converter.prototype.getDoc = function() {
    return this.doc;
};

/**
 * Convert all elements and return the Document immediately.
 * @returns {*}
 */
Converter.prototype.convertAll = function() {
    this.convertLines();
    this.convertCircles();
    this.convertPolygons();
    this.convertRects();
    this.convertEllipses();
    return this.getDoc();
};

/**
 * Convert and replace Line elements with path elements.
 */
Converter.prototype.convertLines = function() {

    var path,
        points,
        x1,
        y1,
        x2,
        y2;

    var items = this.getElements('line');

    for (var i = 0; i < (items || []).length; i++) {

        node = items.item(i);

        x1 = +node.getAttribute('x1');
        y1 = +node.getAttribute('y1');
        x2 = +node.getAttribute('x2');
        y2 = +node.getAttribute('y2');

        path   = this.addPath();
        points = this.toPoints([x1, y1, x2, y2], 3);

        path.setAttribute(
            'd', 'M' + points.join(' ')
        );

        path.setAttribute(
            'class',
            node.getAttribute('class')
        );

        node.parentNode.insertBefore(path, node);
    }

    while ((items || []).length > 0) {
        items.item(0).parentNode.removeChild(items.item(0));
    }
};

/**
 * Convert and replace Rect elements with path elements.
 */
Converter.prototype.convertRects = function() {

    var x,
        y,
        w,
        h,
        proxy = [],
        path,
        node;

    var items = this.getElements('rect');

    for (var n = 0; n < (items || []).length; n++) {

        node = items.item(n);

        x = +node.getAttribute("x");
        y = +node.getAttribute("y");
        w = +node.getAttribute("width");
        h = +node.getAttribute("height");

        proxy = new Proxy(x, y, w, h, this.getAngle(node));

        path = this.addPath();

        path.setAttribute(
            "d",
            "M"  + proxy[0].x + " " + proxy[0].y +
            " L" + proxy[1].x + " " + proxy[1].y +
            " L" + proxy[2].x + " " + proxy[2].y +
            " L" + proxy[3].x + " " + proxy[3].y +
            " Z"
        );

        path.setAttribute('class', node.getAttribute('class'));

        node.parentNode.insertBefore(path, node);
    }

    while ((items || []).length > 0) {
        items.item(0).parentNode.removeChild(items.item(0));
    }
};

/**
 * Convert and replace Circle elements with path elements.
 */
Converter.prototype.convertCircles = function() {

    var cx,
        cy,
        r,
        path,
        node;

    var items = this.getElements('circle');

    for (var n = 0; n < (items || []).length; n++) {

        node = items.item(n);
        cx   = +node.getAttribute("cx");
        cy   = +node.getAttribute("cy");
        r    = +node.getAttribute("r");
        path = this.addPath();

        path.setAttribute(
            "d",
            "M" +
            (cx - r).toFixed(3) + " " +
            cy.toFixed(3) + " A" +
            r.toFixed(3) + " " +
            r.toFixed(3) + " 0 1 0 " +
            (cx + r).toFixed(3) + " " +
            cy.toFixed(3) + " A" +
            r.toFixed(3) + " " +
            r.toFixed(3) + " 0 1 0 " +
            (cx - r).toFixed(3) + " " +
            cy.toFixed(3) + " Z"
        );

        path.setAttribute('class', node.getAttribute('class'));

        node.parentNode.insertBefore(path, node);
    }

    while ((items || []).length > 0) {
        items.item(0).parentNode.removeChild(items.item(0));
    }

};

/**
 * Convert and replace Polygon elements with path elements.
 */
Converter.prototype.convertPolygons = function() {

    var points,
        path,
        data,
        node;

    var items = this.getElements('polygon');

    for (var n = 0; n < (items || []).length; n++) {

        node   = items.item(n);
        points = node.getAttribute("points").split(/\s|,/);
        data   = "M" + points[0] + " " + points[1];
        points = points.slice(2);

        for (var i = 0, size = points.length - 2; i < size; i += 2) {
            data += " L" + points[i] + " " + points[i + 1];
        }

        path = this.addPath();

        path.setAttribute("d", data + " Z");

        path.setAttribute('class', node.getAttribute('class'));

        node.parentNode.insertBefore(path, node);
    }

    while ((items || []).length > 0) {
        items.item(0).parentNode.removeChild(items.item(0));
    }
};

/**
 * Convert and replace Ellipse elements with path elements.
 */
Converter.prototype.convertEllipses = function() {

    var cx,
        cy,
        rx,
        ry,
        deg,
        path,
        node;

    var items = this.getElements('ellipse');

    for (var n = 0; n < (items || []).length; n++) {

        node = items.item(n);

        cx   = +node.getAttribute("cx");
        cy   = +node.getAttribute("cy");
        rx   = +node.getAttribute("rx");
        ry   = +node.getAttribute("ry");
        deg  = this.getAngle(node);

        proxy = new EllipseProxy(cx, cy, rx, ry, deg);

        path = this.addPath();

        path.setAttribute(
            "d", "M" +
            proxy[0].x.toFixed(3) + " " +
            proxy[0].y + " A" + rx + " " + ry + " " + deg + " 1 0 " +
            proxy[1].x + " " +
            proxy[1].y + " A" + rx + " " + ry + " " + deg + " 1 0 " +
            proxy[0].x + " " +
            proxy[0].y + " Z"
        );

        path.setAttribute('class', node.getAttribute('class'));

        node.parentNode.insertBefore(pathObj, node);
    }

    while ((items || []).length > 0) {
        items.item(0).parentNode.removeChild(items.item(0));
    }
};

/**
 * Query the SVG for elements by name.
 * @param nodeName
 * @returns {HTMLCollectionOf<Element> | Array}
 */
Converter.prototype.getElements = function(nodeName) {
    return this.svg.getElementsByTagName(nodeName) || [];
}

/**
 * Get the path segment angle from the transformation.
 * @param node
 * @returns {number}
 */
Converter.prototype.getAngle = function(node) {

    var deg = 0,
        tran,
        param = [];

    tran = node.getAttribute("transform");

    if (tran && tran.indexOf("matrix") !== -1) {
        param = tran.replace(/^matrix\s*\(([\d.\s-]+)\)/g, "$1").split(/\s|,/);
    }

    if ((param || []).length > 0) {
        deg = Math.acos(param[0]) * 180 / Math.PI;
        if (param[param.length - 1] > 0) {
            deg *= -1;
        }
    }

    return deg;
};

/**
 * Proxy object.
 * @param x
 * @param y
 * @param w
 * @param h
 * @param deg
 * @returns {Array}
 * @constructor
 */
var Proxy = function(x, y, w, h, deg) {

    var c,
        r,
        points;

        c    = {x: x + w / 2, y: y + h / 2};
        r    = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
        deg  = deg * Math.PI / 180;

    var deg1 = (Math.PI - Math.acos((w / 2) / r)) - parseFloat(deg),
        deg2 = Math.acos((w / 2) / r) - parseFloat(deg),
        deg3 = - Math.acos((w / 2) / r) - parseFloat(deg),
        deg4 = Math.PI + Math.acos((w / 2) / r) - parseFloat(deg);

    points = [];

    points.push({
        x: Number(c.x + r * Math.cos(deg1)).toFixed(3),
        y: Number(c.y - r * Math.sin(deg1)).toFixed(3)
    });

    points.push({
        x: Number(c.x + r * Math.cos(deg2)).toFixed(3),
        y: Number(c.y - r * Math.sin(deg2)).toFixed(3)
    });

    points.push({
        x: Number(c.x + r * Math.cos(deg3)).toFixed(3),
        y: Number(c.y - r * Math.sin(deg3)).toFixed(3)
    });

    points.push({
        x: Number(c.x + r * Math.cos(deg4)).toFixed(3),
        y: Number(c.y - r * Math.sin(deg4)).toFixed(3)
    });

    return points;
};

/**
 * Ellipse proxy object.
 * @param cx
 * @param cy
 * @param rx
 * @param ry
 * @param deg
 * @returns {Array}
 * @constructor
 */
var EllipseProxy = function(cx, cy, rx, ry, deg) {
    var points = [];

    deg = deg * Math.PI / 180;

    points.push({
        x: Number(cx - rx * Math.cos(deg)).toFixed(3),
        y: Number(cy - rx * Math.sin(deg)).toFixed(3)
    });

    points.push({
        x: Number(points[0].x + 2 * rx * Math.cos(deg)).toFixed(3),
        y: Number(points[0].y + 2 * rx * Math.sin(deg)).toFixed(3)
    });

    return points;
};

/**
 * Add path element to the document.
 * @returns {*}
 */
Converter.prototype.addPath = function() {
    return this.doc.createElementNS(this.NS, 'path');
};

/**
 * Convert points to the proper precision.
 * @param points
 * @param precision
 * @returns {
 *     Uint8Array |
 *     BigInt64Array |
 *     string[] |
 *     Float64Array |
 *     Int8Array |
 *     Float32Array |
 *     Int32Array |
 *     Uint32Array |
 *     Uint8ClampedArray |
 *     BigUint64Array |
 *     Int16Array |
 *     Uint16Array
 * }
 */
Converter.prototype.toPoints = function(points, precision) {
    return points.map(function(item) {
        return Number(item).toFixed(precision);
    });
};

/**
 * The export.
 * @type {Converter}
 */
exports.Converter = Converter;
