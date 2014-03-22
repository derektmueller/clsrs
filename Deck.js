
var auxlib = require ('./auxlib');

var Deck = (function () {

function Deck (argsDict) {
    var defaultPropsDict = {
        cards: '', // json decoded deck file
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

return Deck;

}) ();


module.exports = Deck;

