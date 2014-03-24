
// config interactive prompt
var prompt = (function () {
    var prompt = require ('promptVim');
    prompt.message = '';
    prompt.delimiter = '';
    return prompt;
}) ();

module.exports = prompt;

