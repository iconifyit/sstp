const _ = require('lodash');


/**
 * SvgToJson Base class.
 * @param document
 * @constructor
 */
export default class SvgToJson {

    /**
     * Constructor
     * @param document
     */
    constructor(document) {

        this.svg = document;

        console.log(document);

        this.data = {
            title     : null,
            styles    : [],
            paths     : [],
            gradients : []
        };

        const paths = this.getElements('path');

        this.data.title     = this.getTitle();
        this.data.gradients = this.getLinearGradients();
        this.data.styles    = this.getElement('style').textContent.trim().split('\n').map(function(item) {
            return item.trim();
        });

        _.each(paths, async (path, iter) => {
            this.data.paths.push({
                class : path.getAttribute('class'),
                d     : path.getAttribute('d')
            })
        });
    }

    /**
     * Query the SVG for elements by name.
     * @param nodeName
     * @returns {HTMLCollectionOf<Element> | Array}
     */
    getElements(nodeName) {
        console.log('nodeName', nodeName);
        console.log('this.svg', this.svg);
        return this.svg.getElementsByTagName(nodeName) || [];
    }

    /**
     * Query a single elemtn by name.
     * @param nodeName
     * @returns {Element | null}
     */
    getElement(nodeName) {
        return this.svg.getElementsByTagName(nodeName)[0] || null;
    }

    /**
     * Get the data property.
     * @returns {*}
     */
    getData() {
        return this.data;
    }

    /**
     * LinearGradient base class.
     *
     *     Example:
     *
     *    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-8165.9009" y1="-8150.6392" x2="-8166.1128" y2="-8183.52" gradientTransform="matrix(1 0 0 -0.978 8190.8154 -7961.1655)">
     *        <stop offset="0" style="stop-color:#FFF48C"/>
     *        <stop offset="1" style="stop-color:#FFE500"/>
     *    </linearGradient>
     *
     * @param tag
     * @constructor
     */
    getLinearGradient(tag) {

        const data     = [],
            stopdata = [],
            stops    = this.getElements('stop');

        for (let i = 0; i < (stops || []).length; i++) {
            let stop = stops[i];
            stopdata.push({
                offset : stop.getAttribute('offset'),
                style  : stop.getAttribute('style')
            });
        }

        data.push({
            id : tag.getAttribute('id'),
            gradientUnits : tag.getAttribute('gradientUnits'),
            gradientTransform : tag.getAttribute('gradientTransform'),
            x1 : tag.getAttribute('x1'),
            y1 : tag.getAttribute('y1'),
            x2 : tag.getAttribute('x2'),
            y2 : tag.getAttribute('y2'),
            stops : stopdata
        });

        return data;
    }

    /**
     * Get document title.
     * @returns {Element|*}
     */
    getTitle() {
        return this.getElement('title').textContent;
    }

    /**
     * Get LinearGradients.
     * @returns {Array}
     */
    getLinearGradients() {

        const data  = [];
        const items = this.getElements('linearGradient');

        for (let i = 0; i < (items || []).length; i++) {
            data.push(this.getLinearGradient(items[i]));
        }

        return data;
    }

}
