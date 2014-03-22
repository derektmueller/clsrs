
/**
 * Wrapper around node-commandline instance
 */

var auxlib = require ('./auxlib');
var constants = require ('./constants');

var commandLineParser = (function () {

function CommandLineParser (argsDict) {
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);

    this._commandLine; // internal instance of node-commandline prototype
    this._init ();
};

CommandLineParser.prototype.parse = function () {
    // parse command line options
    try {
        var command = this._commandLine.parse.apply (
            this._commandLine, process.argv);
    } catch (e) {
        /**/console.log ('Usage: ' + this._commandLine.toString ());
    }

    constants.DEBUG && console.log ('command = ');
    constants.DEBUG && console.log (command);

    if (command.h || !command.use) {
        /**/console.log ('Usage: ' + this._commandLine.toString ());
        process.exit ();
    }

    return command;
};

CommandLineParser.prototype._init = function () {
    // config command line parser
    this._commandLine = (function () {
        var CommandLine = require ('node-commandline').CommandLine;
        var commandLine = 
            new CommandLine (process.argv[1].match (/\w+$/));
        commandLine.addArgument ('h'); // help flag
        commandLine.addArgument ('use', { // use deck
            type: 'string',
            sequenced: true
        });
        return commandLine;
    }) ();
};

return new CommandLineParser ();

}) ();


module.exports = commandLineParser;

