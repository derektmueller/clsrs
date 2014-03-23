
var auxlib = require ('./auxlib');
var prompt = require ('./prompt');

var app = (function () {

function App (argsDict) {
    var defaultPropsDict = {
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);

    this._currentDeck;
    this._commands = {};

    this._addCommand ('Show', 'show decks');
    //this._addCommand ('Delete');
    this._addCommand ('Use');
    this._addCommand ('Describe');
    this._addCommand ('Start');
    //this._addCommand ('Help');
    //this._addCommand ('Quit');

    auxlib.log (this._commands);
}

/**
 * Set the current deck
 * @param object deck
 */
App.prototype.setCurrDeck = function (deck) {
    this._currentDeck = deck;
};

App.prototype.getCurrDeck = function (deck) {
    return this._currentDeck;
};

/**
 * Add a command which will be accessible from the main menu
 * @param object command
 */
App.prototype._addCommand = function (command) {
    auxlib.log ('_addCommand');
    var Cmmd = require ('./' + command);
    this._commands[command.toLowerCase ()] = new Cmmd ({app: this});
};

/**
 * Display all commands
 */
App.prototype._displayCmmds = function () {
    console.log (Object.keys (this._commands).join ('\n'));
};

/**
 * Execute a command
 * @param string cmmd User input from main menu
 * @param function callback function to call after command execution
 */
App.prototype._execCmmd = function (cmmd, callback) {
    auxlib.log ('execCmmd: ' + cmmd);
    var parsedCmmd = cmmd.split (' ');
    if (parsedCmmd.length > 2) {
        console.log ('invalid command invocation');
        callback ();
    } else if (parsedCmmd.length === 2) {
        // command with argument

        var cmmd = parsedCmmd[0];
        var argument = parsedCmmd[1];
        auxlib.log ('cmmd = ');
        auxlib.log (cmmd);
        auxlib.log ('argument = ');
        auxlib.log (argument);
        if (this._commands[cmmd]) {
            this._commands[cmmd].call (argument, callback);
        }
    } else {
        // command without argument

        if (this._commands[cmmd].hasOwnProperty ('argument')) {
            console.log ('command requires an argument');
            callback ();
        } else if (this._commands[cmmd]) {
            this._commands[cmmd].call (callback);
        }
    } 
};

/**
 * Start the application
 */
App.prototype.start = function () {
    var that = this;
    prompt.start ();
    (function appLoop () {
        that._displayCmmds ();
        prompt.get ([ { name: 'command' } ], function (err, resp) {
            that._execCmmd (resp.command, appLoop);
        });
    }) ();
};

return new App ();

}) ();

module.exports = app;

