const fs            = require("fs"),
      path          = require("path"),
      DOMParser     = require("xmldom").DOMParser,
      XMLSerializer = require("xmldom").XMLSerializer,
      SVGConverter  = require('./SVGConverter').SVGConverter,
      SvgToJson     = require('./SvgToJson').SvgToJson,
      _             = require('lodash'),
      slash         = require('./functions.js').slash


try {
    let svg,
        svgDocument,
        parser,
        writer,
        data = [];

    const indir  = "./input",
          outdir = "./output";

    parser = new DOMParser();
    writer = new XMLSerializer();

    const icons = fs.readdirSync(indir).filter(f => f.endsWith('.svg'));

    _.each(icons, async (source, iter) => {

        console.log('Converting file ' + source);

        source = slash(indir) + source;

        svgDocument = parser.parseFromString(
            fs.readFileSync(source, "utf8"),
            "text/xml"
        );

        svg = new SVGConverter(svgDocument).convertAll();

        console.log('Save new file to ' + slash(outdir) + path.basename(source));

        fs.writeFileSync(
            slash(outdir) + path.basename(source),
            writer.serializeToString(svg),
            "utf8"
        );

        data.push(new SvgToJson(svg).getData());

        console.log('JSON', data);
    });

    fs.writeFileSync(
        slash(outdir) + '000-emojis-' + (new Date()).getTime() + '.json',
        JSON.stringify({icons : data}),
        "utf8"
    );

    console.log('Done!');
}
catch(e) {
    console.error(e);
}
