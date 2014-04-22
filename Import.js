

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var fs = require ('fs');
var Deck = require ('./Deck');

var Import = (function () {

function Import (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
        argument: null,
        info: 'Import cards from a file to the currently selected deck.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Import.prototype = Object.create (Command.prototype);

/**
 * Call the command. Parses the imported file and adds the cards to the
 * current deck.
 */
Import.prototype.call = function (importFileName, callback) {
    var that = this;  
    var deck = this.app.getCurrDeck ();
    if (!deck) {
        console.log ('No deck selected');
        callback ();
        return;
    }


    var fileName = importFileName;
    fs.readFile (fileName, function (err, data) {
        if (err) {
            auxlib.log (err);
            console.log ('Import file could not be read');
        } else {
            var lines = data.toString ().split (/\n/).filter (
                function (a) {
                    return !a.match (/\n|a|q|(^$)/);
                });
            for (var i = 0; i < lines.length - 1; i += 2) {
                deck.addCard (lines[i], lines[i + 1]); 
            }
            console.log ('cards added');
        }
        Command.prototype.call.call (this, callback);
    });
};

return Import;

}) ();

module.exports = Import;

