/**
 * Custom error for Converter.convertLines()
 * @param message
 * @param stack
 * @constructor
 */
const ConvertLinesError = (message, stack) => {
    this.name    = "ConvertLinesError";
    this.message = message || "Unknown Converter.convertLines() error";
    this.stack   = stack;
}
ConvertLinesError.prototype = Error.prototype

/**
 * Custom error for Converter.convertCircles()
 * @param message
 * @param stack
 * @constructor
 */
const ConvertCirclesError = (message, stack) => {
    this.name    = "ConvertLinesError";
    this.message = message || "Unknown Converter.convertCircles() error";
    this.stack   = stack;
}
ConvertCirclesError.prototype = Error.prototype

/**
 * Custom error for Converter.convertEllipses()
 * @param message
 * @param stack
 * @constructor
 */
const ConvertEllipsesError = (message, stack) => {
    this.name    = "ConvertLinesError";
    this.message = message || "Unknown Converter.convertEllipses() error";
    this.stack   = stack;
}
ConvertEllipsesError.prototype = Error.prototype

/**
 * Custom error for Converter.convertPolygons()
 * @param message
 * @param stack
 * @constructor
 */
const ConvertPolygonsError = (message, stack) => {
    this.name    = "ConvertLinesError";
    this.message = message || "Unknown Converter.convertPolygons() error";
    this.stack   = stack;
}
ConvertPolygonsError.prototype = Error.prototype

/**
 * Custom error for Converter.convertRects()
 * @param message
 * @param stack
 * @constructor
 */
const ConvertRectsError = (message, stack) => {
    this.name    = "ConvertLinesError";
    this.message = message || "Unknown Converter.convertRects() error";
    this.stack   = stack;
}
ConvertRectsError.prototype = Error.prototype

exports.ConvertLinesError    = ConvertLinesError
exports.ConvertCirclesError  = ConvertCirclesError
exports.ConvertEllipsesError = ConvertEllipsesError
exports.ConvertPolygonsError = ConvertPolygonsError
exports.ConvertRectsError    = ConvertRectsError
