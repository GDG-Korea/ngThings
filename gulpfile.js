var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var $ = require('gulp-load-plugins')();

gulp.task('default', function () {
});

gulp.task('build', function () {

});

gulp.task('clean', function () {

});

gulp.task('compile-ts', ['clean-ts', 'ts-lint'], function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('built'));
});

gulp.task('clean-ts', function () {
  del(['built'], {dot: true});
});

gulp.task('ts-lint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
