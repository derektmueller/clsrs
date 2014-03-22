
// config interactive prompt
var prompt = (function () {
    var prompt = require ('prompt');
    prompt.message = '';
    prompt.delimiter = '';
    return prompt;
}) ();

module.exports = prompt;

