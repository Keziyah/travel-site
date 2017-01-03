//import the gulp library into this file
//MUST INSTALL IT TO THE PROJECT FILE for each new PROJECT
//(npm install gulp --save-dev)
let gulp = require("gulp");

//import the watch plugin (npm install gulp-watch --save-dev)
let watch = require("gulp-watch");

//import browser-sync. automatically refreshes browser page when you make changes
//to html/CSS. then add it to the watch task
//Use browsersync to test across browsers. Also to test in mobile. on a phone,
//go to the ip address you see in the command line, and it will take you to the live site.
let browserSync = require("browser-sync").create();

//~~~~~~~~~~~~~~ USING THE WATCH PLUGIN ~~~~~~~~~~~~~~~~~~~~
//first argument is the filepath for the document to be watched
//second argument is a function for what to do
//In this case, we will be watching the index.html file.
//Whenever there is a change, it will trigger the html task above.
//gulp.start begins the task html.
//to run this command, type gulp watch
//Now, whenever index.html is saved with a new change, the html task will run
//to tell it to stop watching, do control - c

//You can tell "watch" to watch as many files as you want
//simply add more watches to the task.
//~~~~~~GULP WATCH TASKS ~~~~~~~~~~~~~~

gulp.task("watch", function() {
  //tell browser-sync where the app is. in this case, all of our crap is in the app folder
  //browserSync will make a server and will open our page in the browser for us
    browserSync.init({
      notify: false, //stops the black notify button from apperaing
      server: {
        baseDir: "app"
      }
    });
  //you can do something similar with CSS, but browser-sync doesn't need to refresh
  //in order to update CSS. see CSS inject below.

  watch("./app/index.html", function() {
    browserSync.reload();   //when i change the html, reload the page
  });

  watch("./app/assets/styles/**/*.css", function() {
    gulp.start("cssInject"); //cssInject is below. in this task, it runs the styles task that is above.
  });
  //the **/*.css means any subfolders, and any files with a .css extension
});

//~~~~~ CSS inject ~~~~~~~
//The source file is our compiled CSS file, the one that is made by the styles
//task above (not by us).
//Pipe this file to browserSync which has a method stream, that injects our css
//into the browser without refreshing.
gulp.task("cssInject", ["styles"],  function() {
//above: in brackets are dependencies of the task we are defining.
//This means that the styles task is a dependency of the cssInject task.
//Basically it says first run styles, then run cssinject.
//Above in watch tasks, we only have to start css inject. because
//css inject includes "styles"
  return gulp.src("./app/temp/styles/styles.css")
  .pipe(browserSync.stream());
});
