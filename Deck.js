
var auxlib = require ('./auxlib');
var boxConfig = require ('./boxConfig');

var Deck = (function () {

function Deck (argsDict) {
    var defaultPropsDict = {
        cards: '', // json decoded deck file
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);

    this._currCard = 0;

    /* used to store temporary deck data while cycling through the deck */
    this._tmpDeck = []; 
    this._expiredCards = []; 
};

/**
 * Filter out cards which don't need to be reviewed and prep the new
 * deck
 */
Deck.prototype.start = function () {
    var that = this;
    var now = +new Date ();
    this._expiredCards = this.cards.filter (function (elem) {
       auxlib.log ('now - elem.lastAsked = ');
       auxlib.log (now - elem.lastAsked);
        if (now - elem.lastAsked > boxConfig[elem.box]) 
            return true;
        else
            that._tmpDeck.push (elem);
    });
};


/**
 * Display question on current card
 */
Deck.prototype.showNextCard = function () {
    var q = this.cards[this._currCard].q; 
    console.log (q);
};

/**
 * @param bool true if deck is complete
 */
Deck.prototype.finished = function () {
    return this._currCard === this.cards.length;
};

/**
 * Resets deck after it's done
 */
Deck.prototype.reset = function () {
    this._tmpDeck = [];
    this._expiredCards = [];
    this._currCard = 0;
};

Deck.prototype.answerCard = function (answer) {
    if (answer) { // check answer
        var card = this._expiredCards[0];
        if (answer == card.a) {
            console.log ('Correct');
            card.box++;
        } else {
            console.log (
                'Incorrect \n' +
                'The correct answer is ' + card.a + '\n'
            );
            card.box = 0;
        }
        card.lastAsked = +new Date ();
        this._tmpDeck.push (card);
        this._expiredCards = this._expiredCards.slice (1);
    }
    this._currCard++;
};

return Deck;

}) ();


module.exports = Deck;

