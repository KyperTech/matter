var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('build', function () {
  return gulp.src('./src/**/*.ts')
    .pipe(ts({
        target: 'ES6',
        out: 'main.js',
        experimentalAsyncFunctions: true
      }));
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'browser-sync']);
