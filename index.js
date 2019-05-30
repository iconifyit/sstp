var convertToPath = require("./svg-shape-to-path").convertToPath;

try {
    console.log('Converting shapes to paths');
    convertToPath(
        "./input/amusement-park.svg",
        "./output/amusement-park-v4.svg"
    );
    console.log('Done');
}
catch(e) {
    console.error(e);
}
