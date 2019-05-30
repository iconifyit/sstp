var fs            = require("fs"),
    DOMParser     = require("xmldom").DOMParser,
    XMLSerializer = require("xmldom").XMLSerializer,
    Converter     = require('./Converter').Converter;

/**
 * Create exportable.
 * @param sourcefile
 * @param toFile
 */
exports.convertToPath = function(sourcefile, toFile) {

    var doc,
        svgString;

    console.log(typeof Converter);

    try {
        svgString = fs.readFileSync(sourcefile, "utf8");
    }
    catch(e) {
        throw sourcefile + " not found.";
    }

    if (! svgString) return;

    doc = new DOMParser().parseFromString(svgString, "text/xml");

    doc = new Converter(
        new DOMParser().parseFromString(svgString, "text/xml")
    ).convertAll();

    fs.writeFileSync(
        toFile,
        new XMLSerializer().serializeToString(doc),
        "utf8"
    );
};
