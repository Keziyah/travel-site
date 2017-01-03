//import the "watch" and "styles" gulpfiles into this file
require("./gulp/tasks/styles");
require("./gulp/tasks/watch"); 


//This is how you create a gulp task. First param is
//the name of the task, second is what the task does.
//To run a "default" task, type gulp into the command line.
// gulp.task("default", function() {
//   console.log("Yay I did a gulp task");
// });
// //To run other named tasks, like this one, type gulp html
// gulp.task("html", function() {
//   console.log("Here's the html task");
// });

// gulp.task("styles", function() {
//   console.log("Here's a SASS/post css task");
// });

//To install gulp plugins, type into the command line [npm install gulp-pluginName --save-dev]
//watch is a plugin that watches for changes to our files.
