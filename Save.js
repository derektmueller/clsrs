

/**
 * This prototype handles deck saving
 */

var auxlib = require ('./auxlib');
var Command = require ('./Command');

var Save = (function () {

function Save (argsDict) {
    Command.call (this, argsDict);
    var defaultPropsDict = {
        info: 'Save changes to the currently selected deck.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
    
};

Save.prototype = Object.create (Command.prototype);


/**
 * Call the command. Reads from the deck file and sets the current deck
 */
Save.prototype.call = function (callback) {
    var that = this;  
    var deck = this.app.getCurrDeck ();

    if (!deck) {
        console.log ('no deck selected');
        callback ();
        return;
    }

    deck.save (callback);
};

return Save;

}) ();

module.exports = Save;

