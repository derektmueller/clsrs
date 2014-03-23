

var auxlib = require ('./auxlib');
var Command = require ('./Command');

var Describe = (function () {

function Describe (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Describe.prototype = Object.create (Command.prototype);

/**
 * Call the command. Print out cards from the current deck.
 */
Describe.prototype.call = function (callback) {
    var that = this;  
    var deck = this.app.getCurrDeck ();
    if (!deck) {
        console.log ('No deck selected');
    }
    for (var i in deck) {
        console.log (deck[i]); 
    }
    callback ();
};

return Describe;

}) ();

module.exports = Describe;

