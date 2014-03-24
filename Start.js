

/**
 * This prototype handles deck execution
 */

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var boxConfig = require ('./boxConfig');
var prompt = require ('./prompt');
var fs = require ('fs');

var Start = (function () {

function Start (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
    
};

Start.prototype = Object.create (Command.prototype);


/**
 * Call the command. Cycles through cards asking questions and accepting
 * user answers
 */
Start.prototype.call = function (callback) {
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
            if (response.answer === 'done') {
                callback ();
                return;
            }
            deck.answerCard (response.answer);
            cycleThroughDeck ();
        });
    }) ();
};

return Start;

}) ();

module.exports = Start;

