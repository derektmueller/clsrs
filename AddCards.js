

/**
 * This prototype handles deck execution
 */

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var boxConfig = require ('./boxConfig');
var prompt = require ('./prompt');
var fs = require ('fs');
var exec = require ('child_process').exec;

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
    // add cards until user enters 'done'
    (function getNewCards () {
        prompt.get ([ 
            { 
                name: 'question',
                vim: true,
            }, 
        ], function (err, response) {
            var q = response.question;
            if (q === 'done') {
                callback ();
                return;
            }
            setTimeout (function () {
            prompt.get ([
            { 
                name: 'answer',
                vim: true
            }, 
            ], function (err, response) {
                var a = response.answer;
                if (a === 'done') {
                    callback ();
                    return;
                }
                if (q.length && a.length) {
                    deck.addCard (q, a);
                    console.log ('card added');
                }
                getNewCards ();
            });
            }, 700);
        });
    }) ();
};

return AddCards;

}) ();

module.exports = AddCards;

