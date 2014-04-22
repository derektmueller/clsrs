
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

    this.unsavedChanges = false;
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
    auxlib.log ('start: _expiredCards = ');
    auxlib.log (this._expiredCards);
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
                    that.unsavedChanges = false;
                    callback (); 
                });
        });
};

/**
 * Adds a new card to the deck
 * @param string question
 * @param string answer
 */
Deck.prototype.addCard = function (question, answer) {
    this.cards.push ({
        q: question,
        a: answer,
        box: 0,
        lastAsked: 0
    });
    this.unsavedChanges = true;
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

/*Deck.prototype.answerCard = function (answer) {
    if (answer) { // check answer
        var card = this._expiredCards[this._currCard];
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
    }
    this.unsavedChanges = true;
    this._currCard++;
};*/

/**
 * Shows the current card's answer
 */
Deck.prototype.revealCard = function () {
    var card = this._expiredCards[this._currCard];
    console.log (card.a);
}

/**
 * Indicate whether answer to card is correct or incorrect and move the
 * card into the appropriate box based on response
 * @param string 'y'|'n'
 */
Deck.prototype.answerCard = function (yesOrNo) {
    var card = this._expiredCards[this._currCard];
    if (yesOrNo === 'y') {
        console.log ('This card will be moved to the next box.');
        card.box++;
    } else {
        console.log ('This card will be moved to the first box.');
        card.box = 0;
    }
    card.lastAsked = +new Date ();
    this.unsavedChanges = true;
    this._currCard++;
};

return Deck;

}) ();


module.exports = Deck;

