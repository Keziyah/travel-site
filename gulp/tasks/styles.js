//import the gulp library into this file
//MUST INSTALL IT TO THE PROJECT FILE for each new PROJECT
//(npm install gulp --save-dev)
let gulp = require("gulp");

//import PostCSS (npm install gulp-postcss --save-dev)
let postcss = require("gulp-postcss");

//import autoprefixer (npm install autoprefixer --save-dev)
//this does webkit prefixes for browser support
let autoprefixer = require("autoprefixer");

//import simple-vars (to handle CSS variables)
//(npm install postcss-simple-vars --save-dev)
let cssvars = require("postcss-simple-vars");

//import postcss-nested, which allows us to write nested css
let nested = require("postcss-nested");

//import postcss import. takes all your imported styles and puts them into the final .css file
//npm install postcss-import --save-dev
let cssImport = require("postcss-import");

let mixins = require("postcss-mixins");

//when putting functions into seperate gulpfiles, make sure to
//put variables at the top


//~~~~~~~~~~ USING POST CSS ~~~~~~~~~~~~~~~~~~~~
//gulp.src("source filepath")
//gulp.dest("destination filepath")
//.pipe("what connects the src and the dest")
//In the following function, we are making a copy of styles, and placing it in a new directory
//that is being created by this function called temp/styles. It is run with gulp watch, and is
//triggered when there is a change to our assets/styles/styles.css file.

// gulp.task("styles", function() {
//   return gulp.src("./app/assets/styles/styles.css").pipe(gulp.dest("./app/temp/styles"));
// });

//modifying the above task to use PostCSS (after downloading it from npm)

//First, install postcss and other plugins like autoprefixer , nested, etc, from npm.
//postcss takes an array. in the array, put all the things you want postcss
//to do

//This function will return a file that was taken from the source, run through
//postcss with autoprefixer, converts variables with cssvars,
// and then copied the .css file into another file in our new directory.
//Note that this function also *creates* the directory. No need to do it in the terminal.

gulp.task("styles", function() {
  return gulp.src("./app/assets/styles/styles.css")
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .on("error", function(errorInfo) {
    console.log(errorInfo.toString()); //lets us know what's wrong
    this.emit("end"); //this finishes gulp tasks even if there's an error
  })
  .pipe(gulp.dest("./app/temp/styles"));
});

//Now, run gulp watch in the terminal. It will watch for changes to our original
//stylesheet. For styles that don't need prefixes, it will just copy them.
//But for styles that do need them, postcss and autoprefixer will add the styles
//for us.
//css vars handles css variable, and nested takes care of nested css. see the stylesheets
//for examples

//remember: gulp watch to run the tasks, and control -c to stop watching
