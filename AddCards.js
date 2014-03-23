

/**
 * This prototype handles deck execution
 */

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var boxConfig = require ('./boxConfig');
var prompt = require ('./prompt');
var fs = require ('fs');

var AddCards = (function () {

function AddCards (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
    
};

AddCards.prototype = Object.create (Command.prototype);


/**
 * Call the command. Cycles through cards asking questions and accepting
 * user answers
 */
AddCards.prototype.call = function (callback) {
    var that = this;  
    var deck = this.app.getCurrDeck ();

    prompt.start ();
    deck.start ();
    (function cycleThroughDeck () {
        if (deck.finished ()) {
            console.log ('Deck complete\n');
            callback ();
            return;
        }
        deck.showNextCard ();
        prompt.get ([ { name: 'answer' } ], function (err, response) {
            deck.answerCard (response.answer);
            cycleThroughDeck ();
        });
    }) ();
};

return AddCards;

}) ();

module.exports = AddCards;

