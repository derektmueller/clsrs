

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var fs = require ('fs');

var Use = (function () {

function Use (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
        argument: null
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Use.prototype = Object.create (Command.prototype);

/**
 * Call the command
 */
Use.prototype.call = function (deckName, callback) {
    var that = this;  
    fs.readFile ('./decks/' + deckName, function (err, data) {
        if (err) {
            auxlib.log (err);
            console.log ('invalid deck name');
        } else {
            var deck = JSON.parse (data);
            that.app.setCurrDeck (deck);
        }
        Command.prototype.call.call (this, callback);
    });
};

return Use;

}) ();

module.exports = Use;

