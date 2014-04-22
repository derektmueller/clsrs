

var auxlib = require ('./auxlib');
var Command = require ('./Command');

var Quit = (function () {

function Quit (argsDict) {
    var argsDict = typeof argsDict === 'undefined' ? {} : argsDict; 
    Command.call (this, argsDict);
    var defaultPropsDict = {
        info: 'Quit the program.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Quit.prototype = Object.create (Command.prototype);

/**
 * Call the command
 */
Quit.prototype.call = function (callback) {
    console.log ('call');
    var that = this;  

    if (this.app.getCurrDeck () && 
        this.app.getCurrDeck ().unsavedChanges) {

        console.log ('Current deck has unsaved changes');
        callback ();
        return;
    }
    process.exit ();
};

return Quit;

}) ();

module.exports = Quit;

