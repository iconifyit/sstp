var fs            = require("fs"),
    DOMParser     = require("xmldom").DOMParser,
    XMLSerializer = require("xmldom").XMLSerializer,
    Converter     = require('./Converter').Converter;

try {
    var doc,
        svgString,
        parser,
        writer,
        source,
        target;

    parser = new DOMParser();
    writer = new XMLSerializer();

    source = "./input/bald-hair.svg";
    target = "./output/bald-hair-v2.svg";

    svgString = fs.readFileSync(source, "utf8");

    doc = new Converter(
        parser.parseFromString(svgString, "text/xml")
    ).convertAll();

    fs.writeFileSync(
        target,
        writer.serializeToString(doc),
        "utf8"
    );

    console.log('Done!');
}
catch(e) {
    console.error(e);
}
