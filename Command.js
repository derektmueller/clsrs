
/**
 * Abstract base prototype for all app commands
 */

var auxlib = require ('./auxlib');

var Command = (function () {

function Command (argsDict) {
    var defaultPropsDict = {
        app: null, // the app singleton
        info: '' // a description of the command
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Command.prototype.getInfo = function () {
    console.log (this.info);
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

