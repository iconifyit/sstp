var Node = function(el) {

    var _node = el;

    this.transform;
}

Node.prototype.getTransformation = function() {

    tran = _node.getAttribute("transform");

    if (tran && tran.indexOf("matrix") !== -1) {
        tranParam = tran.replace(/^matrix\s*\(([\d.\s-]+)\)/g, "$1").split(/\s|,/);
    }

    if (tranParam.length > 0) {
        deg = Math.acos(tranParam[0]) * 180 / Math.PI;
        if (tranParam[tranParam.length - 1] > 0) {
            deg *= -1;
        }
    }
}

exports.Node = Node;
