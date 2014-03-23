
var constants = require ('./constants');
var auxlib = {};

/**
 * Applied in object contructors to facillitate use of variable length
 * argument lists and default object properties.
 * @param dictionary argsDict
 * @param dictionary defaultArgsDict
 */
auxlib.unpack = function (argsDict, defaultArgsDict) {
    var that = this;
    for (var i in defaultArgsDict) {
        if (i, Object.keys (argsDict).indexOf (i) !== -1 &&
            argsDict[i] !== undefined) {
            that[i] = argsDict[i];
        } else {
            that[i] = defaultArgsDict[i];
        }
    }
}

auxlib.log = function (message) {
    if (constants.DEBUG) console.log (message);
};

module.exports = auxlib;

