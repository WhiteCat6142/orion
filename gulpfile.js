var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');


gulp.task('jshint', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scss',function(){
  return gulp.src('src/styles/**/*.scss')
    .pipe($.rubySass({
      style: 'expaned',
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html',function(){
  var assets = $.useref.assets({searchPath: ['.tmp','src']});
  return gulp.src('src/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js',$.uglify({preserveComments: 'some'})))
    .pipe($.if('*.css',$.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html',$.minifyHtml()))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean',function(cb){
  rimraf('dist',cb);
});

gulp.task('watch',function(){
  browserSync.init({
    server:{
      baseDir: ['src','.tmp']
    },
    notify: false
  });

  gulp.watch(['src/styles/**/*.scss'], ['scss']);
  gulp.watch(['src/**/*.html'], browserSync.reload);
  gulp.watch(['{.tmp,src}/styles/**/*.css'], browserSync.reload);
  gulp.watch(['src/scripts/**/*.js'], ['jshint',browserSync.reload]);
});

gulp.task('build', function (cb) {
  runSequence('clean','scss', ['jshint', 'html'], cb);
});

gulp.task('default',['watch']);