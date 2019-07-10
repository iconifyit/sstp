/**
 * Utility class to convert all SVG shape elements to paths.
 * @param document
 * @constructor
 */
class Converter {

    /**
     * Class constructor.
     * @param document
     */
    constructor(document) {
        this.NS  = "http://www.w3.org/2000/svg";
        this.doc = document;
        this.svg = this.doc.getElementsByTagName("svg")[0];
    }

    /**
     * Get the document element.
     * @returns {*}
     */
    getDoc() {
        return this.doc;
    }

    /**
     * Convert all elements and return the Document immediately.
     * @returns {*}
     */
    convertAll() {
        this.convertLines();
        this.convertCircles();
        this.convertPolygons();
        this.convertRects();
        this.convertEllipses();
        return this.getDoc();
    }

    /**
     * Convert and replace Line elements with path elements.
     */
    convertLines() {

        const items = this.getElements('line');

        for (let i = 0; i < (items || []).length; i++) {

            let node,
                path,
                points,
                x1,
                y1,
                x2,
                y2;

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
    }

    /**
     * Convert and replace Rect elements with path elements.
     */
    convertRects() {

        const items = this.getElements('rect');

        for (let n = 0; n < (items || []).length; n++) {

            let x,
                y,
                w,
                h,
                proxy = [],
                path,
                node;

            node = items.item(n);

            x = +node.getAttribute("x");
            y = +node.getAttribute("y");
            w = +node.getAttribute("width");
            h = +node.getAttribute("height");

            proxy = this.getProxy(x, y, w, h, this.getAngle(node));

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
    }

    /**
     * Convert and replace Circle elements with path elements.
     */
    convertCircles() {

        const items = this.getElements('circle');

        for (let n = 0; n < (items || []).length; n++) {

            let node = items.item(n);

            const cx = +node.getAttribute("cx"),
                cy   = +node.getAttribute("cy"),
                r    = +node.getAttribute("r"),
                path = this.addPath();

            path.setAttribute(
                "d",
                "M" +
                (cx - r).toFixed(3) + " " +
                cy.toFixed(3)       + " A" +
                r.toFixed(3)        + " " +
                r.toFixed(3)        + " 0 1 0 " +
                (cx + r).toFixed(3) + " " +
                cy.toFixed(3)       + " A" +
                r.toFixed(3)        + " " +
                r.toFixed(3)        + " 0 1 0 " +
                (cx - r).toFixed(3) + " " +
                cy.toFixed(3)       + " Z"
            );

            path.setAttribute('class', node.getAttribute('class'));

            node.parentNode.insertBefore(path, node);
        }

        while ((items || []).length > 0) {
            items.item(0).parentNode.removeChild(items.item(0));
        }
    }

    /**
     * Convert and replace Polygon elements with path elements.
     */
    convertPolygons() {

        const items = this.getElements('polygon');

        for (let n = 0; n < (items || []).length; n++) {

            let node   = items.item(n);

            let points = node.getAttribute("points").split(/\s|,/),
                data   = "M" + points[0] + " " + points[1];

            for (let i = 0, size = points.length - 2; i < size; i += 2) {
                data += " L" + points[i] + " " + points[i + 1];
            }

            const path = this.addPath();
            path.setAttribute("d", data + " Z");
            path.setAttribute('class', node.getAttribute('class'));

            node.parentNode.insertBefore(path, node);
        }

        while ((items || []).length > 0) {
            items.item(0).parentNode.removeChild(items.item(0));
        }
    }

    /**
     * Convert and replace Ellipse elements with path elements.
     */
    convertEllipses() {

        const items = this.getElements('ellipse');

        for (let n = 0; n < (items || []).length; n++) {

            let node = items.item(n);

            const cx   = +node.getAttribute("cx"),
                cy   = +node.getAttribute("cy"),
                rx   = +node.getAttribute("rx"),
                ry   = +node.getAttribute("ry"),
                deg  = this.getAngle(node),
                path = this.addPath();

            const proxy = this.getEllipseProxy(cx, cy, rx, ry, deg);

            path.setAttribute(
                "d", "M" +
                proxy[0].x + " " +
                proxy[0].y + " A" + rx + " " + ry + " " + deg + " 1 0 " +
                proxy[1].x + " " +
                proxy[1].y + " A" + rx + " " + ry + " " + deg + " 1 0 " +
                proxy[0].x + " " +
                proxy[0].y + " Z"
            );

            path.setAttribute('class', node.getAttribute('class'));

            node.parentNode.insertBefore(path, node);
        }

        while ((items || []).length > 0) {
            items.item(0).parentNode.removeChild(items.item(0));
        }
    }

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
    getEllipseProxy(cx, cy, rx, ry, deg) {
        const points = [];

        deg = deg * Math.PI / 180;

        points.push({
            x : Number(cx - rx * Math.cos(deg)).toFixed(3),
            y : Number(cy - rx * Math.sin(deg)).toFixed(3)
        });

        points.push({
            x : Number( parseFloat(points[0].x) + 2 * rx * Math.cos(deg) ).toFixed(3),
            y : Number( parseFloat(points[0].y) + 2 * rx * Math.sin(deg) ).toFixed(3)
        });

        return points;
    };

    /**
     * Get the path segment angle from the transformation.
     * @param node
     * @returns {number}
     */
    getAngle(node) {

        let tran,
            deg = 0,
            param = [];

        tran = node.getAttribute("transform");

        if (tran && tran.indexOf("matrix") !== -1) {
            param = tran.replace(/^matrix\s*\(([^\)]+)\)/g, "$1").split(/\s|,/);
        }

        if ((param || []).length > 0) {
            deg = Math.acos(param[0]) * 180 / Math.PI;
            if (param.pop() > 0) {
                deg *= -1;
            }
        }

        return deg;
    }

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
    getProxy(x, y, w, h, deg) {

        const c      = {x: x + w / 2, y: y + h / 2},
            r      = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2,
            points = [];

        deg = deg * Math.PI / 180;

        const degs = [
            (Math.PI - Math.acos((w / 2) / r)) - parseFloat(deg),
            Math.acos((w / 2) / r) - parseFloat(deg),
            -Math.acos((w / 2) / r) - parseFloat(deg),
            Math.PI + Math.acos((w / 2) / r) - parseFloat(deg)
        ];

        for (let i = 0; i < degs.length; i++) {
            let d = degs[i];
            points.push({
                x: Number(parseFloat(c.x) + r * Math.cos(d)).toFixed(3),
                y: Number(parseFloat(c.y) - r * Math.sin(d)).toFixed(3)
            })
        }

        return points;
    }

    /**
     * Add path element to the document.
     * @returns {*}
     */
    addPath() {
        return this.doc.createElementNS(this.NS, 'path');
    }

    /**
     * Query the SVG for elements by name.
     * @param nodeName
     * @returns {HTMLCollectionOf<Element> | Array}
     */
    getElements(nodeName) {
        return this.svg.getElementsByTagName(nodeName) || [];
    }

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
    toPoints(points, precision) {
        return points.map((item) => {
            return Number(item).toFixed(precision);
        });
    }
}

/**
 * The export.
 * @type {Converter}
 */
exports.Converter = Converter;
