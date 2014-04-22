

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var fs = require ('fs');
var Deck = require ('./Deck');

var Help = (function () {

function Help (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
        argument: null,
        info: 'Display information about a command.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Help.prototype = Object.create (Command.prototype);

/**
 * Call the command. Reads from the deck file and sets the current deck
 */
Help.prototype.call = function (commandName, callback) {
    var that = this;  
    var command = this.app.getCommand (commandName);
    if (command) {
        command.getInfo ();
    }
    callback ();
};

return Help;

}) ();

module.exports = Help;

