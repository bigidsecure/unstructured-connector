/* gulpFile.js
Gulp is a build system for NodeJS and web applications. This File
contains the code to build the project into a Docker image and 
NodeJS-executable project.

To build the project use:
gulp

To run the project use:
gulp develop
*/

var gulp = require('gulp');
var nodemon = require('nodemon');

/* 
This task will start the application and run Nodemon.
Nodemon is an application that will automatically reload
the application when changes are made.
*/
gulp.task("start", function(cb) {
  var options = {
    watch: ["./"],
    script: "index.js",
    debug: true
  }
  nodemon(options);
  nodemon.on("start", cb);
});


gulp.task("develop", gulp.parallel(["start"]));
