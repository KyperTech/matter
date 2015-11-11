// Load Gulp and all of our Gulp plugins
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Load other npm modules
const del = require('del');
const glob = require('glob');
const path = require('path');
const buffer = require('vinyl-buffer');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const KarmaServer = require('karma').Server;
const _ = require('lodash');

// Gather the library data from `package.json`
const pkg = require('./package.json');
const conf = require('./config.json');

// JS files that should be watched
const jsWatchFiles = ['src/**/*', 'test/**/*'];

// These are files other than JS files which are to be watched.
const otherWatchFiles = ['package.json', '**/.eslintrc', '.jscsrc'];

//Create CDN Publisher
var publisher = CDNPublisher();

//Run test once using Karma and exit
gulp.task('test', function (done) {
  require('babel-core/register');
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Release a new version of the package
gulp.task('release', function(callback) {
  const tagCreate = 'git tag -a v' + pkg.version + ' -m ' + 'Version v' + pkg.version;
  const tagPush = 'git push --tags';
  //Bump package version
  //Unlink local modules
  //Build (test/build:main/build:bundle)
  //Upload to CDN locations
  //Create a git tag and push the tag
  //TODO: Look into what should be moved to happening after travis build
  //TODO: Include 'npm publish', 'git commit' and 'git push'?
  runSequence('bump', 'unlink', 'build', 'upload',  $.shell.task([tagCreate, tagPush]), callback);
});

// Basic usage:
// Will patch the version
gulp.task('bump', function(){
  gulp.src('./component.json')
  .pipe($.bump())
  .pipe(gulp.dest('./'));
});

//Watch files and trigger a rebuild on change
gulp.task('watch', function() {
  const watchFiles = jsWatchFiles.concat(otherWatchFiles);
  gulp.watch(watchFiles, ['build']);
});

//Upload to both locations of CDN
gulp.task('upload', function (callback) {
  runSequence('upload:version', 'upload:latest', callback);
});

//Upload to CDN under version
gulp.task('upload:version', function() {
  return gulp.src('./' + conf.distFolder + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/' + pkg.version + '/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe($.awspublish.reporter());
});
//Upload to CDN under "/latest"
gulp.task('upload:latest', function() {
  return gulp.src('./' + conf.distFolder + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/latest/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe($.awspublish.reporter());
});
//Upload to CDN under "/latest"
gulp.task('upload:docs', function() {
  return gulp.src('./' + conf.folders.docs + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/latest/docs/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe($.awspublish.reporter());
});
// Generate docs based on comments
const esdocConfig = require('./esdoc.json');
gulp.task('docs', function() {
  gulp.src('./' + conf.devFolder)
  .pipe($.esdoc(esdocConfig));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Lint our source code
createLintTask('lint-src', ['src/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['test/**/*.js', '!test/coverage/**']);

//Link list of modules
gulp.task('link', $.shell.task(buildLinkCommands('link')));

//Unlink list of modules
gulp.task('unlink', $.shell.task(buildLinkCommands('unlink')));

// An alias of test
gulp.task('default', ['test']);

//----------------------- Utility Functions -------------------------------\\
//Build an array of commands to link/unlink modules
function buildLinkCommands(linkAction){
  //TODO: Don't allow package types that don't follow standard link/unlink pattern
  // const allowedPackageLinkTypes = ['bower', 'npm'];
  if(!linkAction){
    linkAction = 'link';
  }
  const linkTypes = _.keys(config.linkedModules);
  const messageCommand = 'echo ' + linkAction + 'ing local modules';
  var commands = [messageCommand];
  //Each type of packages to link
  _.each(linkTypes, function (packageType){
    //Check that package link patter is supported
    // if(!_.contains(allowedPackageLinkTypes, packageType)){
    //   console.error('Invalid package link packageType');
    //   return;
    // }
    //Each package of that packageType
    _.each(conf.linkedModules[packageType], function (packageName){
      commands.push(packageType + ' ' + linkAction  + ' ' + packageName);
      if(linkAction === 'unlink'){
        commands.push(packageType + ' install ' + packageName);
      }
    });
  });
  return commands;
}

function CDNPublisher () {
  var s3Config = {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    params:{
      Bucket:conf.cdn.bucketName
    }
  };
  return $.awspublish.create(s3Config);
}

// Send a notification when JSCS fails,
// so that you know your changes didn't build
function jscsNotify(file) {
  if (!file.jscs) { return; }
  return file.jscs.success ? false : 'JSCS failed';
}

function createLintTask(taskName, files) {
  gulp.task(taskName, function() {
    return gulp.src(files)
      .pipe($.plumber())
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failOnError())
      .pipe($.jscs())
      .pipe($.notify(jscsNotify));
  });
}
