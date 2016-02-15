var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require("gulp-rename");
var jscs = require('gulp-jscs');
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'), //this will take care of vendor prefixes
    minifyCSS = require('gulp-cssnano');

gulp.task('hello', function(){
    console.log('Learning how to use Gulp!');
});
// callback function within the gulp.task

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']}))
      .pipe(minifyCSS())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build'));
});

gulp.task('uglify', function(){
    gulp.src('./js/script.js') // What files do we want gulp to consume? The source
        .pipe(jscs()) // run jscs
        .pipe(jscs.reporter()) // reports errors - put ahead of Uglify always. Helped when put ahead of plumber
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(uglify()) // Call the uglify function on these files. Pipe them thru uglify function
        .pipe(rename('script.min.js')) // Put after uglify
        .pipe(gulp.dest('./build')); // Where do we put the result? The destination
});
// use the ./ for this to work

gulp.task('watch', function(){

    browserSync.init({
      server: {
          baseDir:'./'
      }
});

gulp.watch(['./js/script.js'], ['uglify']);
gulp.watch(['./build/script.js'], ['index.html']).on('change', browserSync.reload);
gulp.watch(['./sass/style.scss'], ['sass']);
});
// in command line - type gulp watch and the main js file gets uglified, and the browser with index reloads

gulp.task('default', ['watch', 'uglify']);
// thanks to above you can just write in watch only and it'll trigger the above watch function lines
