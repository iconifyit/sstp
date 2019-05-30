var fs            = require("fs"),
    DOMParser     = require("xmldom").DOMParser,
    XMLSerializer = require("xmldom").XMLSerializer,
    Converter     = require('./Converter').Converter;

try {
    var doc,
        svgString;

    var sourcefile = "./input/amusement-park.svg",
        toFile     = "./output/amusement-park-v4.svg";

    try {
        svgString = fs.readFileSync(sourcefile, "utf8");
    }
    catch(e) {
        throw sourcefile + " not found.";
    }

    doc = new Converter(
        new DOMParser().parseFromString(svgString, "text/xml")
    ).convertAll();

    fs.writeFileSync(
        toFile,
        new XMLSerializer().serializeToString(doc),
        "utf8"
    );

    console.log('Done!');
}
catch(e) {
    console.error(e);
}
