

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var fs = require ('fs');
var Deck = require ('./Deck');

var Use = (function () {

function Use (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
        argument: null,
        info: 'Select a deck to use.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Use.prototype = Object.create (Command.prototype);

/**
 * Call the command. Reads from the deck file and sets the current deck
 */
Use.prototype.call = function (deckName, callback) {
    var that = this;  
    var fileName = '../decks/' + deckName + '.json';
    fs.readFile (fileName, function (err, data) {
        if (err) {
            auxlib.log (err);
            console.log ('invalid deck name');
        } else {
            var deck = new Deck ({
                cards: JSON.parse (data),
                fileName: fileName,
                name: deckName + '.json'
            });
            that.app.setCurrDeck (deck);
        }
        Command.prototype.call.call (this, callback);
    });
};

return Use;

}) ();

module.exports = Use;

