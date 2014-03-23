

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
    if (!deck) {
        console.log ('No deck selected');
        callback ();
        return;
    }

    prompt.start ();
    deck.start ();
    (function getNewCards () {
        prompt.get ([ { name: 'question' }, { name: 'answer' } ], 
            function (err, response) {

            console.log (response);
            getNewCards ();
        });
    }) ();
};

return AddCards;

}) ();

module.exports = AddCards;

