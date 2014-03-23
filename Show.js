

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var exec = require ('child_process').exec;

var Show = (function () {

function Show (argsDict) {
    var argsDict = typeof argsDict === 'undefined' ? {} : argsDict; 
    Command.call (this, argsDict);
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Show.prototype = Object.create (Command.prototype);

/**
 * Call the command
 */
Show.prototype.call = function (callback) {
    console.log ('call');
    var that = this;  
    exec ('ls ../decks', function (err, stdout, stderr) {
        console.log (stdout);
        Command.prototype.call.call (that, callback);
    });
};

return Show;

}) ();

module.exports = Show;

