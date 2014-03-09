
var msPerDay = 8640000;

var boxConfig = [0,1,2,4,8,16,32,64,128,256].map (function (elem) {
    return elem * msPerDay;
});

module.exports = boxConfig;

