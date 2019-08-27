let slash = (path) => {
    if (path.charAt(path.length-1) ===  "/") return path;
    return path + "/";
}

/**
 * Appends a string to a base string using a divider.
 * @param   {string} path
 * @param   {string} subpath
 * @param   {string} separator
 * @returns {string}
 */
let path = (path, subpath, separator) => {
    separator = typeof separator == 'undefined' ? '/' : separator;
    if (path.charAt(path.length-1) != separator) {
        path += separator;
    }
    return path + subpath;
}

/**
 * Utility function to safely get an object property
 * @param   {object}    subject
 * @param   {string}    key
 * @param   {*}         fallback
 * @returns {*}
 */
function get(subject, key, fallback) {
    let value = fallback
    if (typeof subject[key] !== 'undefined') {
        value = subject[key]
    }
    return value
}

exports.get   = get
exports.path  = path
exports.slash = slash
