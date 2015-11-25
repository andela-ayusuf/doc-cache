var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var Server = require('karma').Server;

// minify js files
gulp.task('scripts', function() {
  return gulp.src(['public/app/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// start app
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

// automate test
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// default Task
gulp.task('default', ['scripts', 'nodemon']);
