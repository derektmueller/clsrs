
/**
 * Abstract base prototype for all app commands
 */

var auxlib = require ('./auxlib');

var Command = (function () {

function Command (argsDict) {
    var defaultPropsDict = {
        app: null // the app singleton
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

/**
 * Call the command. When overriding this method, make sure to call the
 * parent's call method (this method).
 */
Command.prototype.call = function (callback) {
    callback ();
};

return Command;

}) ();

module.exports = Command;

