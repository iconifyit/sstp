var fs            = require("fs"),
    path          = require("path"),
    DOMParser     = require("xmldom").DOMParser,
    XMLSerializer = require("xmldom").XMLSerializer,
    Converter     = require('./Converter').Converter,
    SvgToJson     = require('./SvgToJson').SvgToJson,
    _             = require('lodash');

try {
    var doc,
        svgString,
        svgDocument,
        parser,
        writer,
        data = [];

    var indir  = "./Users/scott/Downloads/01- Light/07- SVG/Outline-version",
        outdir = "./output";

    parser = new DOMParser();
    writer = new XMLSerializer();

    let filepaths = fs.readFileSync('./rect.txt', 'utf8');
    let icons = filepaths.split("\n");

    // let icons = fs
    //     .readdirSync(indir)
    //     .filter(f => f.endsWith('.svg'));

    function slashit(path) {
        if (path.charAt(path.length-1) ===  "/") return path;
        return path + "/";
    }

    _.each(icons, async (source, iter) => {

        // source = slashit(indir) + source;

        let subdir = slashit(outdir) +  source.replace(path.basename(source), "");

        console.log('subdir', subdir);
        console.log('exists?', fs.existsSync(subdir));
        return;

        svgDocument = parser.parseFromString(
            fs.readFileSync(source, "utf8"),
            "text/xml"
        );

        doc = new Converter(svgDocument).convertAll();

        if (! fs.existsSync(subdir)) {
            fs.makeDirSync(subdir);
        }

        return;

        fs.writeFileSync(
            slashit(subdir) + path.basename(source),
            writer.serializeToString(doc),
            "utf8"
        );

        // data = new SvgToJson(doc).getData();
        //
        // fs.writeFileSync(
        //     slashit(outdir) + 'icons.json',
        //     JSON.stringify(data),
        //     "utf8"
        // );
    });

    console.log('Done!');
}
catch(e) {
    console.error(e);
}
