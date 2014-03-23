
var auxlib = require ('./auxlib');
var boxConfig = require ('./boxConfig');
var exec = require ('child_process').exec;
var fs = require ('fs');

var Deck = (function () {

function Deck (argsDict) {
    var defaultPropsDict = {
        name: '',
        fileName: '',
        cards: '', // json decoded deck file
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);

    auxlib.log (this);

    this._currCard = 0;
    this._expiredCards = []; 
};

/**
 * Filter out cards which don't need to be reviewed and prep the new
 * deck
 */
Deck.prototype.start = function () {
    var that = this;
    this.reset ();
    var now = +new Date ();
    this._expiredCards = this.cards.filter (function (elem) {
       auxlib.log ('now - elem.lastAsked = ');
       auxlib.log (now - elem.lastAsked);
        if (now - elem.lastAsked > boxConfig[elem.box]) 
            return true;
    });
};

/**
 * Overwrites file and commits changes
 */
Deck.prototype.save = function (callback) {
    var that = this;
    fs.writeFile (this.fileName, JSON.stringify (this.cards), 
        function () {
            exec ('git --git-dir=../decks/.git ' +
                '--work-tree=../decks/ commit -m "new deck version" ' +
                that.name, 
                function () {
                    console.log ('Deck saved');
                    callback (); 
                });
        });
};

/**
 * Display question on current card
 */
Deck.prototype.showNextCard = function () {
    var q = this._expiredCards[this._currCard].q; 
    console.log (q);
};

/**
 * @param bool true if deck is complete
 */
Deck.prototype.finished = function () {
    return this._currCard >= this._expiredCards.length;
};

/**
 * Resets deck after it's done
 */
Deck.prototype.reset = function () {
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
        this._expiredCards = this._expiredCards.slice (1);
    }
    this._currCard++;
};

return Deck;

}) ();


module.exports = Deck;

