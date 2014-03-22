
var gulp = require ('gulp');
var mocha = require ('gulp-mocha');

var paths = {
    tests: ['./tests/*.js']
};

gulp.task ('tests', function () {
    gulp.src (paths.tests)
        .pipe (mocha ({reporter: 'spec'}));
});

