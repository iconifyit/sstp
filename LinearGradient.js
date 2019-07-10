var fs            = require("fs"),
    DOMParser     = require("xmldom").DOMParser,
    SvgDocument   = require('./SvgDocument').SvgDocument,
    _             = require('lodash');


/**
 * LinearGradient base class.
 * @param tag
 * @constructor
 */
var LinearGradient = function(tag) {

    this.data = [];

    let gradient = {
        id : null,
        gradientUnits : null,
        gradientTransform : null,
        x1 : null,
        y1 : null,
        x2 : null,
        y2 : null,
        stops : []
    }

    let stops    = this.getElements('stop'),
        stopdata = [];

    _.each(stops, (stop, iter) => {
        stopdata.push({
            offset : stop.getAttribute('offset'),
            style  : stop.getAttribute('style')
        });
    })

    this.data.push({
        id : tag.getAttribute('id'),
        gradientUnits : tag.getAttribute('gradientUnits'),
        gradientTransform : tag.getAttribute('gradientTransform'),
        x1 : tag.getAttribute('x1'),
        y1 : tag.getAttribute('y1'),
        x2 : tag.getAttribute('x2'),
        y2 : tag.getAttribute('y2'),
        stops : stopdata
    });

    // <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-8165.9009" y1="-8150.6392" x2="-8166.1128" y2="-8183.52" gradientTransform="matrix(1 0 0 -0.978 8190.8154 -7961.1655)">
    //    <stop offset="0" style="stop-color:#FFF48C"/>
    //    <stop offset="1" style="stop-color:#FFE500"/>
    // </linearGradient>

}

LinearGradient.prototype = SvgDocument.prototype;


exports.LinearGradient = LinearGradient;
