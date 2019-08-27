const fs            = require('fs-extra'),
      _             = require('lodash'),
      XMLSerializer = require('xmldom').XMLSerializer,
      resemble      = require('resemblejs'),
      svgToPng      = require('svg-to-png'),
      SVGConverter  = require('../SVGConverter').SVGConverter

const tmpdir  = __dirname + '/tmp',
      svgin   = __dirname + '/svg',
      pngin   = __dirname + '/png',
      svgout  = tmpdir + '/svg-out',
      pngout  = tmpdir + '/png-out'

const origSvgFile = svgin  + '/all-shapes.svg',
      origPngFile = pngin  + '/all-shapes.png',
      newSvgFile  = svgout + '/all-shapes.svg',
      newPngFile  = pngout + '/all-shapes.png'

const writer  = new XMLSerializer()

// const svgSource = '<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48" style="enable-background:new 0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#9DDBEA;} .st1{fill:#FFE500;} .st2{fill:#EBCB00;} .st3{fill:#FFF48C;} .st4{opacity:0.15;fill:#45413C;enable-background:new ;} .st5{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;} .st6{fill:#FFAA54;} .st7{fill:#00B8F0;} .st8{fill:#4ACFFF;} .st9{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;}</style><title>03-face-with-tears-of-joy</title><path class="st0" d="M34.451 3.759L13.493 3.759 3.014 21.909 13.493 40.059 34.451 40.059 44.93 21.909z"/><g id="_Group_"><circle id="_Ellipse_" class="st1" cx="23.981" cy="21.907" r="15.38"/><path id="_Compound_Path_" class="st2" d="M18.774,7.424c-8,2.871-12.158,11.683-9.288,19.684s11.683,12.158,19.684,9.288 c7.993-2.868,12.152-11.668,9.295-19.665c-2.853-8.001-11.652-12.173-19.653-9.32C18.799,7.415,18.786,7.42,18.774,7.424z M28.39,34.168c-7.276,2.616-15.295-1.161-17.911-8.437S11.64,10.436,18.916,7.82s15.295,1.161,17.911,8.437 S35.666,31.552,28.39,34.168z"/><ellipse id="_Ellipse_2" transform="matrix(0.941 -0.3384 0.3384 0.941 -2.324 7.3136)" class="st3" cx="19.816" cy="10.323" rx="4.61" ry="1.15"/><ellipse id="_Ellipse_3" class="st4" cx="24" cy="43.5" rx="12.31" ry="1.5"/><circle id="_Ellipse_4" class="st5" cx="23.981" cy="21.907" r="15.38"/><path id="_Path_" class="st6" d="M35.773,21.748c0.217,0.602-0.42,1.373-1.418,1.732s-1.979,0.17-2.196-0.433 c-0.217-0.602,0.42-1.373,1.418-1.732C34.574,20.956,35.556,21.145,35.773,21.748z"/><path id="_Path_2" class="st6" d="M14.788,29.293c0.217,0.602,1.198,0.791,2.196,0.433c0.997-0.359,1.634-1.13,1.418-1.732 c-0.217-0.602-1.198-0.791-2.196-0.433C15.208,27.92,14.571,28.691,14.788,29.293z"/><path id="_Path_3" class="st5" d="M14.171,26.454c-0.312-0.677-0.015-1.479,0.662-1.791c0.677-0.312,1.479-0.015,1.791,0.662 c0.032,0.07,0.059,0.144,0.079,0.218"/><path id="_Path_4" class="st5" d="M31.909,20.076c-0.312-0.677-0.015-1.479,0.662-1.791c0.677-0.312,1.479-0.015,1.791,0.662 c0.032,0.07,0.059,0.144,0.079,0.218"/><g id="_Group_3"><g id="_Group_4"><path id="_Path_7" class="st7" d="M7.044,36.009c4.222,1.989,4.278-5.066,7.116-6.809C8.666,27.605,2.831,34.017,7.044,36.009z"/><path id="_Path_8" class="st8" d="M14.126,29.255l-0.196,0.134c-4.761,0.001-8.917,5.14-5.363,6.955 c-0.528,0.025-1.054-0.091-1.523-0.334C2.831,34.017,8.666,27.605,14.126,29.255z"/><path id="_Path_9" class="st5" d="M7.044,36.009c4.222,1.989,4.278-5.066,7.116-6.809C8.666,27.605,2.831,34.017,7.044,36.009z"/></g><g id="_Group_5"><path id="_Path_10" class="st7" d="M6.069,23.841c0.03,3.039,4.196,1.148,5.98,2.356C11.519,22.477,6.083,20.776,6.069,23.841z"/><path class="st8" d="M11.068,24.031c-1.712-2.073-4.982-2.566-4.999-0.19c-0.103,0.778,0.388,1.512,1.147,1.713 C7.118,23.358,9.18,23.095,11.068,24.031z"/><path id="_Path_11" class="st5" d="M6.069,23.841c0.03,3.039,4.196,1.148,5.98,2.356C11.519,22.477,6.083,20.776,6.069,23.841z"/></g><g id="_Group_6"><path id="_Path_12" class="st7" d="M2.378,29.802c1.467,1.598,2.681-1.41,4.219-1.655C4.581,26.47,0.962,28.197,2.378,29.802z"/><path class="st8" d="M2.89,30.16c0.151-1.117,1.876-2.438,3.616-2.119c-2.107-1.485-5.522,0.189-4.128,1.76 C2.524,29.953,2.698,30.074,2.89,30.16z"/><path id="_Path_13" class="st5" d="M2.378,29.802c1.467,1.598,2.681-1.41,4.219-1.655C4.581,26.47,0.962,28.197,2.378,29.802z"/></g></g><g id="_Group_7"><g id="_Group_8"><path id="_Path_14" class="st7" d="M45.861,22.052c-1.989,4.222-6.515-1.185-9.776-0.736 C39.268,16.602,47.85,17.83,45.861,22.052z"/><path id="_Path_15" class="st8" d="M36.099,21.354c0.078-0.012,0.157-0.019,0.237-0.021c3.671-3.031,10.195-1.732,8.564,1.947 c0.423-0.317,0.755-0.741,0.961-1.228C47.85,17.83,39.268,16.602,36.099,21.354z"/><path id="_Path_16" class="st5" d="M45.861,22.052c-1.989,4.222-6.515-1.185-9.776-0.736 C39.268,16.602,47.85,17.83,45.861,22.052z"/></g><g id="_Group_9"><path id="_Path_17" class="st7" d="M38.864,12.05c1.969,2.342-2.504,3.557-3.111,5.624C33.793,14.468,36.901,9.695,38.864,12.05z"/><path class="st8" d="M35.13,15.379c0-2.689,2.217-5.154,3.734-3.33c0.575,0.534,0.663,1.413,0.206,2.051 C37.748,12.345,35.99,13.455,35.13,15.379z"/><path id="_Path_18" class="st5" d="M38.864,12.05c1.969,2.342-2.504,3.557-3.111,5.624C33.793,14.468,36.901,9.695,38.864,12.05z"/></g><g id="_Group_10"><path id="_Path_19" class="st7" d="M45.467,14.309c-0.104,2.163-2.965,0.62-4.297,1.407 C41.695,13.125,45.585,12.152,45.467,14.309z"/><path class="st8" d="M45.339,14.897c-0.818-0.768-2.999-0.686-4.138,0.669c0.641-2.473,4.378-3.37,4.266-1.258 C45.461,14.511,45.418,14.71,45.339,14.897z"/><path id="_Path_20" class="st5" d="M45.467,14.309c-0.104,2.163-2.965,0.62-4.297,1.407 C41.695,13.125,45.585,12.152,45.467,14.309z"/></g></g></g><path transform="matrix(0.941 -0.3384 0.3384 0.941 -8.5316 10.8493)" class="st9" d="M21.644 27.336H32.064V32.455999999999996H21.644z"/><path class="st5" d="M21.951 31.659L31.756 28.133"/><path class="st5" d="M25.988 27.487L27.72 32.305"/><path class="st5" d="M23.536 28.368L25.269 33.186"/><path class="st5" d="M28.439 26.606L30.171 31.424"/></svg>'

const svgSource = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '\t viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">\n' +
    '<style type="text/css">\n' +
    '\t.st0{fill:#9DDBEA;}\n' +
    '\t.st1{fill:#FFE500;}\n' +
    '\t.st2{fill:#EBCB00;}\n' +
    '\t.st3{fill:#FFF48C;}\n' +
    '\t.st4{opacity:0.15;fill:#45413C;enable-background:new    ;}\n' +
    '\t.st5{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;}\n' +
    '\t.st6{fill:#FFAA54;}\n' +
    '\t.st7{fill:#00B8F0;}\n' +
    '\t.st8{fill:#4ACFFF;}\n' +
    '\t.st9{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;}\n' +
    '</style>\n' +
    '<title>03-face-with-tears-of-joy</title>\n' +
    '<polygon class="st0" points="34.451,3.759 13.493,3.759 3.014,21.909 13.493,40.059 34.451,40.059 44.93,21.909 "/>\n' +
    '<g id="_Group_">\n' +
    '\t<circle id="_Ellipse_" class="st1" cx="23.981" cy="21.907" r="15.38"/>\n' +
    '\t<path id="_Compound_Path_" class="st2" d="M18.774,7.424c-8,2.871-12.158,11.683-9.288,19.684s11.683,12.158,19.684,9.288\n' +
    '\t\tc7.993-2.868,12.152-11.668,9.295-19.665c-2.853-8.001-11.652-12.173-19.653-9.32C18.799,7.415,18.786,7.42,18.774,7.424z\n' +
    '\t\t M28.39,34.168c-7.276,2.616-15.295-1.161-17.911-8.437S11.64,10.436,18.916,7.82s15.295,1.161,17.911,8.437\n' +
    '\t\tS35.666,31.552,28.39,34.168z"/>\n' +
    '\t\n' +
    '\t\t<ellipse id="_Ellipse_2" transform="matrix(0.941 -0.3384 0.3384 0.941 -2.324 7.3136)" class="st3" cx="19.816" cy="10.323" rx="4.61" ry="1.15"/>\n' +
    '\t<ellipse id="_Ellipse_3" class="st4" cx="24" cy="43.5" rx="12.31" ry="1.5"/>\n' +
    '\t<circle id="_Ellipse_4" class="st5" cx="23.981" cy="21.907" r="15.38"/>\n' +
    '\t<path id="_Path_" class="st6" d="M35.773,21.748c0.217,0.602-0.42,1.373-1.418,1.732s-1.979,0.17-2.196-0.433\n' +
    '\t\tc-0.217-0.602,0.42-1.373,1.418-1.732C34.574,20.956,35.556,21.145,35.773,21.748z"/>\n' +
    '\t<path id="_Path_2" class="st6" d="M14.788,29.293c0.217,0.602,1.198,0.791,2.196,0.433c0.997-0.359,1.634-1.13,1.418-1.732\n' +
    '\t\tc-0.217-0.602-1.198-0.791-2.196-0.433C15.208,27.92,14.571,28.691,14.788,29.293z"/>\n' +
    '\t<path id="_Path_3" class="st5" d="M14.171,26.454c-0.312-0.677-0.015-1.479,0.662-1.791c0.677-0.312,1.479-0.015,1.791,0.662\n' +
    '\t\tc0.032,0.07,0.059,0.144,0.079,0.218"/>\n' +
    '\t<path id="_Path_4" class="st5" d="M31.909,20.076c-0.312-0.677-0.015-1.479,0.662-1.791c0.677-0.312,1.479-0.015,1.791,0.662\n' +
    '\t\tc0.032,0.07,0.059,0.144,0.079,0.218"/>\n' +
    '\t<g id="_Group_3">\n' +
    '\t\t<g id="_Group_4">\n' +
    '\t\t\t<path id="_Path_7" class="st7" d="M7.044,36.009c4.222,1.989,4.278-5.066,7.116-6.809C8.666,27.605,2.831,34.017,7.044,36.009z"\n' +
    '\t\t\t\t/>\n' +
    '\t\t\t<path id="_Path_8" class="st8" d="M14.126,29.255l-0.196,0.134c-4.761,0.001-8.917,5.14-5.363,6.955\n' +
    '\t\t\t\tc-0.528,0.025-1.054-0.091-1.523-0.334C2.831,34.017,8.666,27.605,14.126,29.255z"/>\n' +
    '\t\t\t<path id="_Path_9" class="st5" d="M7.044,36.009c4.222,1.989,4.278-5.066,7.116-6.809C8.666,27.605,2.831,34.017,7.044,36.009z"\n' +
    '\t\t\t\t/>\n' +
    '\t\t</g>\n' +
    '\t\t<g id="_Group_5">\n' +
    '\t\t\t<path id="_Path_10" class="st7" d="M6.069,23.841c0.03,3.039,4.196,1.148,5.98,2.356C11.519,22.477,6.083,20.776,6.069,23.841z"\n' +
    '\t\t\t\t/>\n' +
    '\t\t\t<path class="st8" d="M11.068,24.031c-1.712-2.073-4.982-2.566-4.999-0.19c-0.103,0.778,0.388,1.512,1.147,1.713\n' +
    '\t\t\t\tC7.118,23.358,9.18,23.095,11.068,24.031z"/>\n' +
    '\t\t\t<path id="_Path_11" class="st5" d="M6.069,23.841c0.03,3.039,4.196,1.148,5.98,2.356C11.519,22.477,6.083,20.776,6.069,23.841z"\n' +
    '\t\t\t\t/>\n' +
    '\t\t</g>\n' +
    '\t\t<g id="_Group_6">\n' +
    '\t\t\t<path id="_Path_12" class="st7" d="M2.378,29.802c1.467,1.598,2.681-1.41,4.219-1.655C4.581,26.47,0.962,28.197,2.378,29.802z"/>\n' +
    '\t\t\t<path class="st8" d="M2.89,30.16c0.151-1.117,1.876-2.438,3.616-2.119c-2.107-1.485-5.522,0.189-4.128,1.76\n' +
    '\t\t\t\tC2.524,29.953,2.698,30.074,2.89,30.16z"/>\n' +
    '\t\t\t<path id="_Path_13" class="st5" d="M2.378,29.802c1.467,1.598,2.681-1.41,4.219-1.655C4.581,26.47,0.962,28.197,2.378,29.802z"/>\n' +
    '\t\t</g>\n' +
    '\t</g>\n' +
    '\t<g id="_Group_7">\n' +
    '\t\t<g id="_Group_8">\n' +
    '\t\t\t<path id="_Path_14" class="st7" d="M45.861,22.052c-1.989,4.222-6.515-1.185-9.776-0.736\n' +
    '\t\t\t\tC39.268,16.602,47.85,17.83,45.861,22.052z"/>\n' +
    '\t\t\t<path id="_Path_15" class="st8" d="M36.099,21.354c0.078-0.012,0.157-0.019,0.237-0.021c3.671-3.031,10.195-1.732,8.564,1.947\n' +
    '\t\t\t\tc0.423-0.317,0.755-0.741,0.961-1.228C47.85,17.83,39.268,16.602,36.099,21.354z"/>\n' +
    '\t\t\t<path id="_Path_16" class="st5" d="M45.861,22.052c-1.989,4.222-6.515-1.185-9.776-0.736\n' +
    '\t\t\t\tC39.268,16.602,47.85,17.83,45.861,22.052z"/>\n' +
    '\t\t</g>\n' +
    '\t\t<g id="_Group_9">\n' +
    '\t\t\t<path id="_Path_17" class="st7" d="M38.864,12.05c1.969,2.342-2.504,3.557-3.111,5.624C33.793,14.468,36.901,9.695,38.864,12.05z\n' +
    '\t\t\t\t"/>\n' +
    '\t\t\t<path class="st8" d="M35.13,15.379c0-2.689,2.217-5.154,3.734-3.33c0.575,0.534,0.663,1.413,0.206,2.051\n' +
    '\t\t\t\tC37.748,12.345,35.99,13.455,35.13,15.379z"/>\n' +
    '\t\t\t<path id="_Path_18" class="st5" d="M38.864,12.05c1.969,2.342-2.504,3.557-3.111,5.624C33.793,14.468,36.901,9.695,38.864,12.05z\n' +
    '\t\t\t\t"/>\n' +
    '\t\t</g>\n' +
    '\t\t<g id="_Group_10">\n' +
    '\t\t\t<path id="_Path_19" class="st7" d="M45.467,14.309c-0.104,2.163-2.965,0.62-4.297,1.407\n' +
    '\t\t\t\tC41.695,13.125,45.585,12.152,45.467,14.309z"/>\n' +
    '\t\t\t<path class="st8" d="M45.339,14.897c-0.818-0.768-2.999-0.686-4.138,0.669c0.641-2.473,4.378-3.37,4.266-1.258\n' +
    '\t\t\t\tC45.461,14.511,45.418,14.71,45.339,14.897z"/>\n' +
    '\t\t\t<path id="_Path_20" class="st5" d="M45.467,14.309c-0.104,2.163-2.965,0.62-4.297,1.407\n' +
    '\t\t\t\tC41.695,13.125,45.585,12.152,45.467,14.309z"/>\n' +
    '\t\t</g>\n' +
    '\t</g>\n' +
    '</g>\n' +
    '<rect x="21.644" y="27.336" transform="matrix(0.941 -0.3384 0.3384 0.941 -8.5316 10.8493)" class="st9" width="10.42" height="5.12"/>\n' +
    '<line class="st5" x1="21.951" y1="31.659" x2="31.756" y2="28.133"/>\n' +
    '<line class="st5" x1="25.988" y1="27.487" x2="27.72" y2="32.305"/>\n' +
    '<line class="st5" x1="23.536" y1="28.368" x2="25.269" y2="33.186"/>\n' +
    '<line class="st5" x1="28.439" y1="26.606" x2="30.171" y2="31.424"/>\n' +
    '</svg>\n'

/**
 * Runs all conversions on SVG input file.
 * @param   {string}    inputFile
 * @param   {string}    outputFile
 * @returns {*|string}
 */
const doSvgConversion = (inputFile, outputFile) => {

    console.log('SVG input file', inputFile)

    const svgString = writer.serializeToString(
        new SVGConverter(inputFile).convertAll()
    );
    fs.writeFileSync(outputFile, svgString, 'utf8')

    return svgString
}

/**
 * Convert SVG file to PNG.
 * @param       {string}    inputfile
 * @param       {string}    outputfile
 * @rerturns    {string}    The locaiton of the new PNG file
 */
const doPngConversion = (input, output) => {
    return svgToPng.convert(input, output, {
            defaultWidth  : 48,
            defaultHeight : 48
        })
}

/**
 * Compares original and converted PNG files.
 * @param imgFileOne
 * @param imgFileTwo
 * @param assertionCallback
 * @param n
 * @returns {number}
 */
const doComparison = (imgFileOne, imgFileTwo) => {

    const options = {
        output: {
            errorColor : {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType           : "movement",
            transparency        : 0.3,
            largeImageThreshold : 1200,
            useCrossOrigin      : false,
            outputDiff          : false
        },
        scaleToSameSize         : true,
        ignore                  : "antialiasing"
    }

    var misMatchPercent;

    resemble.compare(imgFileOne, imgFileTwo, options, (err, data) => {
        if (err) throw new Error(err)
        misMatchPercent = Number(data.misMatchPercentage)
    });

    console.log('misMatchPercent', misMatchPercent)

    return misMatchPercent
}

/**
 * SVGConverter class tests.
 */
describe('SVGConverter', () => {

    let svgString

    beforeAll(() => {

        // if (fs.existsSync(origSvgFile)) {
        //     fs.unlinkSync(origSvgFile);
        // }
        //
        // fs.writeFileSync(origSvgFile, svgSource, "utf8")

        // Delete previous tmp dir

        if (fs.existsSync(tmpdir)) {
            fs.removeSync(tmpdir)
        }

        // Create new tmp dirs

        const dirs = [
              tmpdir,
              svgout,
              pngin,
              pngout
        ]

        _.each(dirs, (dir, iter) => {
            if (! fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
        })

        // Run all SVG conversions

        svgString = doSvgConversion(origSvgFile, newSvgFile)

        // Create converted PNG file

        // doPngConversion([origSvgFile], pngin)
        doPngConversion([newSvgFile], pngout)
    })

    afterAll(() => {
        if (fs.existsSync(tmpdir)) {
            fs.removeSync(tmpdir)
        }
        // if (fs.existsSync(origPngFile)) {
        //     fs.unlink(origPngFile)
        // }
    })

    test('Verifies that all <line/> elements have been converted to paths', () => {

        expect(svgString.indexOf('<line')).toEqual(-1)
    });

    test('Verifies that all <circle/> elements have been converted to paths', () => {

        expect(svgString.indexOf('<circle')).toEqual(-1)
    });

    test('Verifies that all <ellipse/> elements have been converted to paths', () => {

        expect(svgString.indexOf('<ellipse')).toEqual(-1)
    });

    test('Verifies that all <rect/> elements have been converted to paths', () => {

        expect(svgString.indexOf('<rect')).toEqual(-1)
    });

    test('Verifies that all <polygon/> elements have been converted to paths', () => {

        expect(svgString.indexOf('<polygon')).toEqual(-1)
    });

    test('Verifies image looks the same before and after SVG shape conversions.', async () => {

        let n   = 0,
            max = Math.pow(10, 6)

        while (! fs.existsSync(newPngFile) && n < max) {
            n++
        }

        console.log(`n = ${n}`)
        console.log(`max = ${max}`)

        expect(doComparison(origPngFile, newPngFile)).toEqual(0)
    })

});